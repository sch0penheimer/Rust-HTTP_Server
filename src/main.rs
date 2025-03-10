use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server, StatusCode};
use hyper::header::CONTENT_TYPE;
use tokio::fs::File;
use tokio::io::AsyncReadExt;
use std::net::SocketAddr;
use std::path::Path;
use mime_guess::from_path;

//*** File Serving Helper Function ***//
async fn serve_file(path: &str) -> Result<Response<Body>, hyper::Error> {
    if !Path::new(path).exists() {
        return Ok(Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("404 Not Found"))
            .unwrap());
    }

    //- Asynchronous File Opening -//
    let mut file = File::open(path).await?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).await?;

    //- MIME type guessing -//
    let mime_type = from_path(path).first_or_octet_stream();

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header(CONTENT_TYPE, mime_type.as_ref())
        .body(Body::from(contents))
        .unwrap())
}

async fn handle_request(req: Request<Body>) -> Result<Response<Body>, hyper::Error> {
    let path = req.uri().path();
    let file_path = match path {
        //- index.html as default -//
        "/" => "static/index.html",
        //- Auxilary Files at / -//
        _ => format!("static{}", path),
    };

    serve_file(&file_path).await
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let make_svc = make_service_fn(|_conn| {
        async { Ok::<_, hyper::Error>(service_fn(handle_request)) }
    });
    let server = Server::bind(&addr).serve(make_svc);
    println!("Haitam's Rust HTTP WebServer running @: http://{}", addr);

    //- Run the Server -//
    if let Err(e) = server.await {
        eprintln!("Server error: {}", e);
    }
}