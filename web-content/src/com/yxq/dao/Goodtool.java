package com.yxq.dao;
import java.sql.*;
import java.util.*;
public class Goodtool {
	DB mydb=new DB();
		public boolean IsGoodExist() throws SQLException {
			String sql = "select * from goods";
			if(mydb.getResultSet(sql).next())
				return true;
			return false;
		}
		public boolean InsertGoods(String code, String name, float price,int num,int storage) {
			String sql ="insert into goods values('"+code+"','"+name+"','"+price+"','"+num+"','"+storage+"')";
			if(mydb.update(sql)!=-1)
				return true;
			return false;
		}
		public boolean IsRemove(String code,int num,int storage) {
			String sql1 ="update goods set num="+(num-1)+" where code='"+code+"'";
			String sql2 ="update goods set storage="+(storage+1)+" where code='"+code+"'";
			if(mydb.update(sql1)!=-1&&mydb.update(sql2)!=-1)
				return true;
			return false;
		}
		public boolean IsBuy(String code,int num,int storage) {
			String sql1 ="update goods set num="+(num+1)+" where code='"+code+"'";
			String sql2 ="update goods set storage="+(storage-1)+" where code='"+code+"'";
			if(mydb.update(sql1)!=-1&&mydb.update(sql2)!=-1)
				return true;
			return false;
		}
}

