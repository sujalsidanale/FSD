const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Create a custom EventEmitter instance
const eventEmitter = new EventEmitter();

// Listen for the custom event
eventEmitter.on('studentRegistered', () => {
    console.log('Event Triggered: Student Registered');
});

// Create the HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Route: GET /
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Welcome to Student Information System (Node.js Server)');
        res.end();
    }
    // Route: GET /about
    else if (pathname === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('About Node.js: Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.');
        res.end();
    }
    // Route: GET /student
    else if (pathname === '/student' && method === 'GET') {
        const query = parsedUrl.query;

        // If query parameters are present, display them
        if (query.name && query.age) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(`Student Name: ${query.name}\nAge: ${query.age}`);
            res.end();
        } else {
            // Otherwise, serve the form.html file
            const filePath = path.join(__dirname, 'form.html');
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Internal Server Error');
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
        }
    }
    // Route: POST /submit
    else if (pathname === '/submit' && method === 'POST') {
        let body = '';

        // Collect data chunks
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // Process the complete body
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const name = params.get('name');
            const age = params.get('age');

            // Trigger custom event
            eventEmitter.emit('studentRegistered');

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Student Registered Successfully\n');
            res.write(`Name: ${name}\n`);
            res.write(`Age: ${age}`);
            res.end();
        });
    }
    // 404 Not Found
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    }
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

