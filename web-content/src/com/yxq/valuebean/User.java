package com.yxq.valuebean;

public class User {
	private String usrname;						//保存商品名称
	private String password;						//保存商品价格
	private int identity;							//保存商品购买数量
	

	public int getIdentity() {
		return identity;
	}
	public void setIdentity(int identity) {
		this.identity = identity;
	}
	public String getUsrname() {
		return usrname;
	}
	public void setUsrname(String usrname) {
		this.usrname = usrname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
