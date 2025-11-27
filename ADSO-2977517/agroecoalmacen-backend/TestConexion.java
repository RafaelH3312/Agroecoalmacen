import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConexion {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/agroecoalmacen?useSSL=false&serverTimezone=UTC";
        String user = "root";           // tu usuario MySQL
        String password = "12345";      // tu contraseña MySQL

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println("Conexión exitosa!");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Error al conectar.");
        }
    }
}
