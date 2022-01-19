//Written by abouz009
// FractalDrawer class draws a fractal of a shape indicated by user input
import java.awt.Color;
import java.util.Scanner;
import java.util.Random;

public class FractalDrawer {
    private double totalArea=0;  // member variable for tracking the total area

    public FractalDrawer() {}  // contructor


    //TODO:
    // drawFractal creates a new Canvas object
    // and determines which shapes to draw a fractal by calling appropriate helper function
    // drawFractal returns the area of the fractal
    public double drawFractal(String type) {
        Canvas drawing = new Canvas();
        if (type.equals("circle")) {
            return drawCircleFractal(125,400,400,Color.RED,drawing,7);
        } else if (type.equals("triangle")) {
            return drawTriangleFractal(400,400,200,600,Color.RED,drawing,7);
        } else if (type.equals("rectangle")) {
            return drawRectangleFractal(400,400,200,200,Color.RED,drawing,7);
        }

        return -1;
    }


    //TODO:
    // drawTriangleFractal draws a triangle fractal using recursive techniques
    public double drawTriangleFractal(double width, double height, double x, double y, Color c, Canvas can, int level) {
        if (level == 1) {
            Triangle triangle = new Triangle(x,y,width,height);
            totalArea += triangle.calculateArea();
            triangle.setColor(c);
            can.drawShape(triangle);
        } else {
            Triangle triangle = new Triangle(x,y,width,height);
            totalArea += triangle.calculateArea();
            triangle.setColor(c);
            can.drawShape(triangle);
            if (c == Color.RED) {
                c = Color.BLUE;
            } else if (c == Color.BLUE) {
                c = Color.GREEN;
            } else if (c == Color.GREEN) {
                c = Color.ORANGE;
            } else if (c == Color.ORANGE) {
                c = Color.BLACK;
            } else if (c == Color.BLACK) {
                c = Color.PINK;
            } else if (c == Color.PINK) {
                c = Color.CYAN;
            }

            drawTriangleFractal(width/2, height/2, x, y, c, can, level - 1);
            drawTriangleFractal(width/2, height/2, x + width/4, y - height/2, c, can, level - 1);
            drawTriangleFractal(width/2, height/2, x + width/2, y, c, can, level - 1);
        }

        return totalArea;
    }
        


    // TODO:
    // drawCircleFractal draws a circle fractal using recursive techniques
    public double drawCircleFractal(double radius, double x, double y, Color c, Canvas can, int level) {
        if (level == 1) {
            Circle circle = new Circle(x,y,radius);
            totalArea += circle.calculateArea();
            circle.setColor(c);
            can.drawShape(circle);
        } else {
            Circle circle = new Circle(x,y, radius);
            totalArea += circle.calculateArea();
            circle.setColor(c);
            can.drawShape(circle);
            if (c == Color.RED) {
                c = Color.BLUE;
            } else if (c == Color.BLUE) {
                c = Color.GREEN;
            } else if (c == Color.GREEN) {
                c = Color.ORANGE;
            } else if (c == Color.ORANGE) {
                c = Color.BLACK;
            } else if (c == Color.BLACK) {
                c = Color.PINK;
            } else if (c == Color.PINK) {
                c = Color.CYAN;
            }

            drawCircleFractal(radius/2, x, y-radius*1.5, c, can, level - 1);
            drawCircleFractal(radius/2, x+radius*1.5, y, c, can, level - 1);
            drawCircleFractal(radius/2, x, y+radius*1.5, c, can, level - 1);
            drawCircleFractal(radius/2, x-radius*1.5, y, c, can, level - 1);
        }

        return totalArea;
    }


    //TODO:
    // drawRectangleFractal draws a rectangle fractal using recursive techniques
    public double drawRectangleFractal(double width, double height, double x, double y, Color c, Canvas can, int level) {
        if (level == 1) {
            Rectangle rectangle = new Rectangle(x,y,width,height);
            totalArea += rectangle.calculateArea();
            rectangle.setColor(c);
            can.drawShape(rectangle);
        } else {
            Rectangle rectangle = new Rectangle(x,y,width,height);
            totalArea += rectangle.calculateArea();
            rectangle.setColor(c);
            can.drawShape(rectangle);
            if (c == Color.RED) {
                c = Color.BLUE;
            } else if (c == Color.BLUE) {
                c = Color.GREEN;
            } else if (c == Color.GREEN) {
                c = Color.ORANGE;
            } else if (c == Color.ORANGE) {
                c = Color.BLACK;
            } else if (c == Color.BLACK) {
                c = Color.PINK;
            } else if (c == Color.PINK) {
                c = Color.CYAN;
            }
            
            drawRectangleFractal(width/2, height/2, x-width/2, y-height/2, c, can, level - 1);
            drawRectangleFractal(width/2, height/2, x+width, y-height/2, c, can, level - 1);
            drawRectangleFractal(width/2, height/2, x-width/2, y+height, c, can, level - 1);
            drawRectangleFractal(width/2, height/2, x+width, y+height, c, can, level - 1);
        }

        return totalArea;
        
    }

    //TODO:
    // main should ask user for shape input, and then draw the corresponding fractal.
    // should print area of fractal
    public static void main(String[] args) {
        FractalDrawer fractal = new FractalDrawer();
        Scanner shape = new Scanner(System.in);
        System.out.println("What base shape do you want for your fractal? (circle, triangle, or rectangle)");
        String input = shape.nextLine();
        if (input.equals("circle")) {
            System.out.println(fractal.drawFractal("circle"));
        } else if (input.equals("triangle")) {
            System.out.println(fractal.drawFractal("triangle"));
        } else if (input.equals("rectangle")) {
            System.out.println(fractal.drawFractal("rectangle"));
        }
    }
}
