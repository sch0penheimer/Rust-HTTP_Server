use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server, StatusCode};
use hyper::header::CONTENT_TYPE;
use tokio::fs::File;
use tokio::io::AsyncReadExt;
use std::net::SocketAddr;
use std::path::Path;
use mime_guess::from_path;
use std::convert::Infallible;

//*** File Serving Helper Function ***//
async fn serve_file(path: &str) -> Result<Response<Body>, Infallible> {
    if !Path::new(path).exists() {
        return Ok(Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("404 Not Found"))
            .unwrap_or_else(|_| Response::new(Body::from("Internal Server Error"))));
    }

    //- Async File Opening -//
    let file_result = File::open(path).await;
    let mut file = match file_result {
        Ok(file) => file,
        Err(e) => {
            eprintln!("Failed to open file {}: {}", path, e);
            return Ok(Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from("500 Internal Server Error"))
                .unwrap_or_else(|_| Response::new(Body::from("Internal Server Error"))));
        }
    };

    let mut contents = Vec::new();
    match file.read_to_end(&mut contents).await {
        Ok(_) => {},
        Err(e) => {
            eprintln!("Failed to read file {}: {}", path, e);
            return Ok(Response::builder()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .body(Body::from("500 Internal Server Error"))
                .unwrap_or_else(|_| Response::new(Body::from("Internal Server Error"))));
        }
    };

    //- MIME type guessing -//
    let mime_type = from_path(path).first_or_octet_stream();

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header(CONTENT_TYPE, mime_type.as_ref())
        .body(Body::from(contents))
        .unwrap_or_else(|e| {
            eprintln!("Failed to build response: {}", e);
            Response::new(Body::from("Internal Server Error"))
        }))
}

async fn handle_request(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    let path = req.uri().path();
    let file_path = match path {
        //- index.html as default -//
        "/" => "static/index.html".to_string(),
        //- Auxiliary Files at root (/) -//
        _ => format!("static{}", path),
    };

    serve_file(&file_path).await
}

#[tokio::main]
async fn main() {
    //- Loopback adress (localhost) and port choice -//
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    
    let make_svc = make_service_fn(|_conn| async {
        Ok::<_, Infallible>(service_fn(handle_request))
    });
    
    let server = Server::bind(&addr).serve(make_svc);
    println("||============================================||");
    println("||******* Haitam's Rust HTTP WebServer *******||");
    println("||____________________________________________||");
    println!(" Running @ {}", addr);

    if let Err(e) = server.await {
        eprintln!("Server error: {}", e);
    }
}