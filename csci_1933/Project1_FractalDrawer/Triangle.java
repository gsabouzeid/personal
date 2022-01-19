//Written by abouz009
import java.lang.Math;
import java.awt.Color;

public class Triangle {

	private double xpos;
	private double ypos;
	private double width;
	private double height;
	private Color c;

	public Triangle(double x, double y, double w, double h) {
		xpos = x;
		ypos = y;
		width = w;
		height = h;
	}

	public double calculatePerimeter() {
		return (Math.sqrt(Math.pow(height,2) + Math.pow(width/2,2)) * 2) + width;
	}

	public double calculateArea() {
		return (width * height) / 2;
	}

	public void setColor(Color col) {
		c = col;
	}

	public void setPos(double x, double y) {
		xpos = x;
		ypos = y;
	}

	public void setHeight(double h) {
		height = h;
	}

	public void setWidth(double w) {
		width = w;
	}

	public Color getColor() {
		return c;
	}

	public double getXPos() {
		return xpos;
	}

	public double getYPos() {
		return ypos;
	}

	public double getHeight() {
		return height;
	}

	public double getWidth() {
		return width;
	}
}