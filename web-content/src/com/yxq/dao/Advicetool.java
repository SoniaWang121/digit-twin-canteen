package com.yxq.dao;
import java.sql.*;
import java.util.*;
public class Advicetool {
	DB mydb=new DB();
	public boolean IsInsertAdvice(String username,String advice) throws SQLException {
		String sql = "insert into advices values('"+username+"','"+advice+"')";
		if(mydb.update(sql)!=-1)
			return true;
		return false;
	}
}
