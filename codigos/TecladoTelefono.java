import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

public class TecladoTelefono {
    // Diccionario para mapear números a letras según el teclado numérico de los teléfonos antiguos
    private static final Map<Character, String> teclado = new HashMap<>();
    static {
        teclado.put('2', "abc");
        teclado.put('3', "def");
        teclado.put('4', "ghi");
        teclado.put('5', "jkl");
        teclado.put('6', "mno");
        teclado.put('7', "pqrs");
        teclado.put('8', "tuv");
        teclado.put('9', "wxyz");
    }

    // Método principal para generar todas las combinaciones
    public static List<String> generarCombinaciones(String numeros) {
        List<String> combinaciones = new ArrayList<>();
        if (numeros == null || numeros.length() == 0) {
            return combinaciones;
        }
        generarTodasCombinaciones(numeros, 0, new StringBuilder(), combinaciones);
        return combinaciones;
    }

    // Método utilitario recursivo para generar combinaciones
    private static void generarTodasCombinaciones(String numeros, int indice, StringBuilder combinacionActual, List<String> combinaciones) {
        if (indice == numeros.length()) {
            combinaciones.add(combinacionActual.toString());
            return;
        }

        char digito = numeros.charAt(indice);
        String letras = teclado.get(digito);
        for (int i = 0; i < letras.length(); i++) {
            combinacionActual.append(letras.charAt(i));
            generarTodasCombinaciones(numeros, indice + 1, combinacionActual, combinaciones);
            combinacionActual.deleteCharAt(combinacionActual.length() - 1);
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String numeros = scanner.nextLine();
        List<String> combinaciones = generarCombinaciones(numeros);
        System.out.println("Combinaciones para " + numeros + ": " + combinaciones);
    }
}