import com.sun.net.httpserver.*;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

public class MiniServer {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        System.out.println("Server started on http://localhost:8000");

        server.createContext("/api/login",   MiniServer::handleLogin);
        server.createContext("/api/user",    MiniServer::handleUser);
        server.createContext("/api/gantt/projects", MiniServer::handleProjects);
        server.createContext("/api/gantt/tasks",    MiniServer::handleTasks);

        server.setExecutor(null);
        server.start();
    }

    /* =================  通用工具：打印 + 返回  ================= */
    private static void send(HttpExchange ex, int status, String json) throws IOException {
        // ===== CORS =====
        ex.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        ex.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        ex.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if ("OPTIONS".equalsIgnoreCase(ex.getRequestMethod())) {
            ex.sendResponseHeaders(204, -1);
            return;
        }

        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");

        // ===== 打印响应 =====
        System.out.println("<<<< RESPONSE <<<<");
        System.out.println("Status : " + status);
        System.out.println("Body   : " + json);
        System.out.println("====================");

        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static String readBody(HttpExchange ex) throws IOException {
        try (BufferedReader br = new BufferedReader(
                new InputStreamReader(ex.getRequestBody(), StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = br.readLine()) != null) sb.append(line);
            return sb.toString();
        }
    }

    private static void printRequest(HttpExchange ex, String body) {
        System.out.println("===== REQUEST  =====");
        System.out.println(ex.getRequestMethod() + " " + ex.getRequestURI());
        System.out.println("--- Headers ---");
        for (Map.Entry<String, List<String>> e : ex.getRequestHeaders().entrySet()) {
            System.out.println(e.getKey() + ": " + e.getValue());
        }
        if (!body.isEmpty()) {
            System.out.println("--- Body ---");
            System.out.println(body);
        }
        System.out.println("====================");
    }

    /* =================  业务 handler  ================= */

    private static void handleLogin(HttpExchange ex) throws IOException {
        if (!"POST".equalsIgnoreCase(ex.getRequestMethod())) {
            send(ex, 405, "{\"error\":\"Method Not Allowed\"}");
            return;
        }

        String body = readBody(ex);
        printRequest(ex, body);

        // 简单解析 JSON（仅演示用，生产请用库）
        String json = body.trim();
        boolean isTestAccount = json.contains("\"admin\"") && json.contains("\"123456\"");

        if (isTestAccount) {
            send(ex, 200, "{\"success\":true,\"token\":\"test-token-123\"}");
        } else {
            send(ex, 200, "{\"success\":false}"); // 原逻辑
        }
    }

    private static void handleUser(HttpExchange ex) throws IOException {
        printRequest(ex, "");
        send(ex, 200, "{\"id\":1,\"username\":\"testuser\",\"email\":\"test@example.com\"}");
    }

    private static void handleProjects(HttpExchange ex) throws IOException {
        printRequest(ex, "");
        send(ex, 200,
                "[{\"id\":1,\"name\":\"学习计划\",\"created_at\":\"2025-07-01\"}," +
                        "{\"id\":2,\"name\":\"创业计划\",\"created_at\":\"2025-07-05\"}]");
    }

    private static void handleTasks(HttpExchange ex) throws IOException {
        printRequest(ex, "");
        send(ex, 200,
                "[{\"id\":101,\"projectId\":1,\"name\":\"复习数学\",\"startDate\":\"2025-07-10\",\"endDate\":\"2025-07-15\",\"duration\":5,\"progress\":50,\"color\":\"blue\",\"notes\":\"高数为主\"}," +
                        "{\"id\":102,\"projectId\":1,\"name\":\"复习英语\",\"startDate\":\"2025-07-16\",\"endDate\":\"2025-07-20\",\"duration\":4,\"progress\":20,\"color\":\"green\",\"notes\":\"单词与作文\"}]");
    }
}