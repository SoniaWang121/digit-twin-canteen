<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="java.sql.* ,com.yxq.*" %>
<%@page import="java.net.*"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

<jsp:useBean id="db" class="com.yxq.dao.DB" scope="session"> </jsp:useBean>
<jsp:useBean id="dbtool" class="com.yxq.dao.DBtool" scope="session"></jsp:useBean>

<%
session.setAttribute("db", db);
session.setAttribute("dbtool", dbtool);
%>

<%
//String username=(String)request.getParameter("username");
//String password=(String)request.getParameter("password");
//System.out.print(username);
if(dbtool.IsUserExist(request.getParameter("username"),request.getParameter("password"),0)){%>
    <h1>登陆成功，3秒后自动跳转……</h1>
	<% response.setHeader("refresh", "3;URL=buyerindex.jsp");
}
else if(!dbtool.IsUserExist(request.getParameter("username"),request.getParameter("password"),0)){
	dbtool.InsertUser(request.getParameter("username"),request.getParameter("password"),0);%>
	<h1>注册成功，3秒后自动跳转……</h1>
	<% response.setHeader("refresh", "3;URL=buyerindex.jsp");
}
else{ %>
	<h1>密码错误！</h1>
	<% response.setHeader("refresh", "2;URL=postbuyer.jsp");

}
%>
</body>
</html>