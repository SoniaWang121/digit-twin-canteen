package com.yxq.valuebean;

public class GoodsSingle {
	private String name;						//������Ʒ����
	private float price;						//������Ʒ�۸�
	private int num;							//������Ʒ��������
	private int code;							//������Ʒ����
	private int storage;						//������Ʒ�����
	private boolean visible;					//�Ƿ���û��ɼ�
	
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
