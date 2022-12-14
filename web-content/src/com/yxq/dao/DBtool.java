package com.yxq.dao;
import java.sql.*;
import java.util.*;
public class DBtool {
	DB mydb=new DB();
	public boolean IsUserExist(String username, String password,int id) throws SQLException {
		String sql = "select * from users where username='"+username+"'and password='"+password+"'and id='"+id+"'";
		System.out.println(sql);
		if(mydb.getResultSet(sql).next())
			return true;
		return false;
	}
	public boolean InsertUser(String username, String password,int id) {
		String sql ="insert into users values('"+username+"','"+password+"','"+id+"')";
		if(mydb.update(sql)!=-1)
			return true;
		return false;	
	}
}