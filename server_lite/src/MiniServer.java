import com.sun.net.httpserver.*;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class MiniServer {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        System.out.println("Server started on http://localhost:8000");

        server.createContext("/api/login", MiniServer::handleLogin);
        server.createContext("/api/user", MiniServer::handleUser);
        server.createContext("/api/gantt/projects", MiniServer::handleProjects);
        server.createContext("/api/gantt/tasks", MiniServer::handleTasks);

        server.setExecutor(null); // default executor
        server.start();
    }

    private static void handleLogin(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            sendResponse(exchange, 405, "Method Not Allowed");
            return;
        }

        String response = "{ \"token\": \"test-token-123\" }";
        sendJson(exchange, response);
    }

    private static void handleUser(HttpExchange exchange) throws IOException {
        String response = "{ \"id\": 1, \"username\": \"testuser\", \"email\": \"test@example.com\" }";
        sendJson(exchange, response);
    }

    private static void handleProjects(HttpExchange exchange) throws IOException {
        String response = """
        [
          { "id": 1, "name": "学习计划", "created_at": "2025-07-01" },
          { "id": 2, "name": "创业计划", "created_at": "2025-07-05" }
        ]
        """;
        sendJson(exchange, response);
    }

    private static void handleTasks(HttpExchange exchange) throws IOException {
        String response = """
        [
          {
            "id": 101,
            "projectId": 1,
            "name": "复习数学",
            "startDate": "2025-07-10",
            "endDate": "2025-07-15",
            "duration": 5,
            "progress": 50,
            "color": "blue",
            "notes": "高数为主"
          },
          {
            "id": 102,
            "projectId": 1,
            "name": "复习英语",
            "startDate": "2025-07-16",
            "endDate": "2025-07-20",
            "duration": 4,
            "progress": 20,
            "color": "green",
            "notes": "单词与作文"
          }
        ]
        """;
        sendJson(exchange, response);
    }

    private static void sendJson(HttpExchange exchange, String json) throws IOException {
        byte[] bytes = json.getBytes("UTF-8");
        exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(200, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String message) throws IOException {
        byte[] bytes = message.getBytes("UTF-8");
        exchange.getResponseHeaders().add("Content-Type", "text/plain; charset=UTF-8");
        exchange.sendResponseHeaders(statusCode, bytes.length);
        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
