export const templateMap={
    cpp: {
        name: "main.cpp",
        content: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
    },
    python: {
        name: "main.py",
        content: `print("Hello, World!")`,
    },
    java: {
        name: "Main.java",
        content: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
    },
}