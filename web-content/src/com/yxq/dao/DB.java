package com.yxq.dao;
import java.sql.*;
import java.util.*;
public class DB {
	private String className="com.mysql.cj.jdbc.Driver";
	private String url = "jdbc:mysql://localhost:3306/goods?serverTimezone=Asia/Shanghai";
	private String usr="root";
	private String pwd="sdba0307";

	private ResultSet rst=null;
	private Connection con=null ;
	private Statement smt=null;
	{	try{
		Class.forName(className);
			}catch(ClassNotFoundException e)
	{System.out.println("���ܼ������ݿ���������"+e.toString());}
		try{
		con=DriverManager.getConnection(url,usr,pwd);
	}catch(Exception e){System.out.println("�����������ݿ�!"+e.toString());}
		try{
		smt=con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_READ_ONLY);
		}catch(Exception e){System.out.println(e.toString());}


	}
	public ResultSet getResultSet(String sql)
	{	try{
			rst=smt.executeQuery(sql);
		}catch(Exception e){System.out.println(e.toString());}
		return rst;
	}
	
	public int update(String sql)
	{	int ret=0;
		try{ 
		ret=smt.executeUpdate(sql);
		
		}catch(Exception e){ret=-1;System.out.println(e.toString());}
	
		finally {
        			//this.closed();
   		 }
		return ret;
	}
	public void closed()
	{	try{
		if(rst!=null)rst.close();
		if(smt!=null)smt.close();
		if(con!=null)con.close();
		}catch(Exception e){System.out.println(e.toString());}
	}
	public List getResultTable(String sql) throws SQLException
	{
		ResultSetMetaData rsmd;
		ArrayList result=new ArrayList();
		rst=getResultSet(sql);
		rsmd = rst.getMetaData();
		//String str="<table border=1 style=font-size:40px>";
		String str="";
		str=str+"<tr>";
		 for(int i=1;i<=rsmd.getColumnCount();i++)
			str=str+"<th>"+rsmd.getColumnLabel(i)+"</th>";
		str=str+"</tr>";			
		result.add(str);       
		while(rst.next())
		 {  	str="<tr>";
			for(int i=1;i<=rsmd.getColumnCount();i++)
			{	if ( rsmd.getColumnTypeName(i).equalsIgnoreCase("VARCHAR"))
		     	       	    	str=str+"<td>"+rst.getString(i)+"</td>";
		           		if ( rsmd.getColumnTypeName(i).equalsIgnoreCase("CHAR"))
		     	       		str=str+"<td>"+rst.getString(i)+"</td>";	
				if(rsmd.getColumnTypeName(i).equalsIgnoreCase("SMALLINT"))
					str=str+"<td>"+rst.getInt(i)+"</td>";
		                        	if(rsmd.getColumnTypeName(i).equalsIgnoreCase("INT"))
					str=str+"<td>"+rst.getInt(i)+"</td>";
		                        	if (rsmd.getColumnTypeName(i).equalsIgnoreCase("long"))
					str=str+"<td>"+rst.getLong(i)+"</td>";
		       		if ( rsmd.getColumnTypeName(i).equalsIgnoreCase("float"))
					str=str+"<td>"+rst.getFloat(i)+"</td>";
				if(rsmd.getColumnTypeName(i).equalsIgnoreCase("double"))
					str=str+"<td>"+rst.getDouble(i)+"</td>";
		    		if(rsmd.getColumnTypeName(i).equalsIgnoreCase("real"))
					str=str+"<td>"+rst.getFloat(i)+"</td>";
			}
		  	str=str+"</tr>";
			result.add(str);
		}
		 //str="</table>";  
		//result.add(str);
		return result;
	}
	
}
