//Written by abouz009
import java.lang.Math;
import java.awt.Color;

public class Circle {

	private double xpos;
	private double ypos;
	private double radius;
	private Color c;

	public Circle(double x, double y, double r) {
		xpos = x;
		ypos = y;
		radius = r;
	}

	public double calculatePerimeter() {
		return 2 * Math.PI * radius;
	}

	public double calculateArea() {
		return Math.PI * radius * radius;
	}

	public void setColor(Color col) {
		c = col;
	}

	public void setPos(double x, double y) {
		xpos = x;
		ypos = y;
	}

	public void setRadius(double r) {
		radius = r;
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

	public double getRadius() {
		return radius;
	}    
}