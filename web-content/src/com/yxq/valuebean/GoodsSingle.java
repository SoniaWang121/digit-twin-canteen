package com.yxq.valuebean;

public class GoodsSingle {
	private String name;						//保存商品名称
	private float price;						//保存商品价格
	private int num;							//保存商品购买数量
	private int code;							//保存商品代码
	private int storage;						//保存商品库存量
	private boolean visible;					//是否对用户可见
	
	public boolean isVisible() {
		return visible;
	}
	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	public int getStorage() {
		return storage;
	}
	public void setStorage(int storage) {
		this.storage = storage;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}	
}
