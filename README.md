# Rust HTTP Static File Web Server

A lightweight HTTP server built with Rust and Hyper for serving static web content. This server is designed to be simple, fast, and easy to configure, making it perfect for local development or simple web hosting needs (mainly for static websites).

## Features

- **Static File Serving**: Serves HTML, CSS, JavaScript, and other static assets
- **MIME Type Detection**: Automatically detects and sets appropriate content types
- **Error Handling**: Proper HTTP status codes for different error scenarios
- **Asynchronous I/O**: Built with Tokio for non-blocking file operations
- **Zero Configuration**: Ready to run out of the box

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (1.56.0 or later)
- Cargo (comes with Rust)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MaCh-nE/Rust-HTTP_WebServer.git
   cd Rust-HTTP_WebServer
   ```

2. Build the project :
   ```bash
   cargo build --release
   ```

## Usage

1. Create a `static` folder in the project root directory
2. Add your web assets (HTML, CSS, JS files) to the `static` directory
3. Make sure you have an `index.html` file in the c directory
4. Reference all of your static assets with `/{static-subdirectory}/assetName` in the `index.html`
5. Run the server:
   ```bash
   cargo run --release
   ```
6. Access your website at http://127.0.0.1:3000

## Project Structure

```
project/
├── src/
│   └── main.rs       # Server implementation
├── static/           # Static files directory
│   ├── index.html    # Main HTML file (required and 1 minimum per subrepo in /static)
│   ├── index.css     # CSS styles
│   ├── index.js      # JavaScript code
│   └── ...           # Other static assets
├── Cargo.toml        # Rust dependencies and project metadata
└── README.md         # This file
```

## Dependencies

This project relies on the following Rust crates:
- `hyper`: HTTP server implementation
- `tokio`: Asynchronous runtime
- `mime_guess`: MIME type detection
- Other standard library components

## How It Works

The server handles HTTP requests with the following logic:

1. When a request comes in, the server extracts the URI path
2. For the root path (`/`), it serves `static/index.html`
3. For other paths, it looks for corresponding files in the `static` directory
4. The server detects appropriate MIME types based on file extensions
5. Content is served with proper HTTP headers and status codes
6. Error handling provides appropriate responses for missing files or server issues

## Customization

### Changing the Port

To use a different port, modify the `SocketAddr` in the `main` function:

```rust
let addr = SocketAddr::from(([127, 0, 0, 1], 3000)); // Change 3000 to your desired port
```

### Serving from a Different Directory

To serve files from a different directory, change the path prefix in the `handle_request` function:

```rust
let file_path = if path == "/" {
    "./your_directory/index.html".to_string()
} else {
    format!("./your_directory{}", path)
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
