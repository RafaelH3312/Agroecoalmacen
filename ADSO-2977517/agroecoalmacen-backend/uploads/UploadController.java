@RestController
@CrossOrigin
public class UploadController {

    @PostMapping("/upload")
    public String subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            if (!file.getContentType().startsWith("image/")) {
                return "Solo imágenes";
            }

            String nombreArchivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String ruta = "uploads/" + nombreArchivo;

            File destino = new File(ruta);
            destino.getParentFile().mkdirs(); // crea carpeta si no existe
            file.transferTo(destino);

            return nombreArchivo; // devuelve solo el nombre
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}