import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {
    private static final String URL = "C:\\Users\\Caos\\Desktop\\Agroecoalmacen\\ADSO-2977517\\agroecoalmacen-frontend\\agroecoalmacenbackend";
    private static final String USER = "Gelato ";
    private static final String PASSWORD = "3312";

    public static Connection getConnection() {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
