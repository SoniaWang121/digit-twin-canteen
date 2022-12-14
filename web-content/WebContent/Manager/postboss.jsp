<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title> manage</title>
</head>
<body background="2.jpg">
<center>
<br><br><br>
<h1 align="center">管理员界面</h1>
<br><br>
<form name="regForm" action="bosslogin.jsp">
        <table>
            <tr>
                <td>用户名</td>
                <td><input type="text" name="username"/></td>
            </tr>
            <tr>
                <td>密   码</td>
                <td><input type="password" name="password"/></td>
            </tr>
            
            <tr>
            
                <td colspan="2">
                <input type="submit" name="submit" value="登录/注册"/>
                </td>
            </tr>
        </table>
    </form>
</center>
</body>
</html>