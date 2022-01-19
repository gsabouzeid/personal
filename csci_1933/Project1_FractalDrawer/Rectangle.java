//Written by abouz009
import java.awt.Color;

public class Rectangle {

	private double xpos;
	private double ypos;
	private double width;
	private double height;
	private Color c;

	public Rectangle(double x, double y, double w, double h) {
		xpos = x;
		ypos = y;
		width = w;
		height = h;
	}

	public double calculatePerimeter() {
		return (width * 2) + (height * 2);
	}

	public double calculateArea() {
		return width * height;
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