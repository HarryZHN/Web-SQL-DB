var DB = function(dbname){
	this.db = openDatabase(dbname,'1.0.0','数据库的描述信息',1024*1024);  //打开数据库，没有则创建
	this.Init();
}

DB.prototype.Init = function(tableName,colums){
	
	//可以初始化创建一些表
}

//创建表
//tableName:表名
//colums:字段（json格式的数组）
DB.prototype.CreateTable = function(tableName,colums){
	var sql = 'create table if not exists '+tableName;
	var t;
	if (colums instanceof Array && colums.length>0){
	   t=[];
	   for (var i in colums){
	     t.push(colums[i].name+' '+colums[i].type);
	   }
	   t=t.join(', ');
	}
	else if(typeof colums=="object"){
	   t+=colums.name+' '+colums.type;
	}
	sql=sql+' ('+t+')';
	this.db.transaction(function (t) { 
	   t.executeSql(sql) ;
	});
}
//插入数据
DB.prototype.InsertData = function(sql){
	this.db.transaction(function (t) {
		t.executeSql(
			sql,
			[],
			function(t,result){
				alert('操作成功！');
			},
			function(t,error){
				alert('操作失败：'+error.message);
			}
		) ;
	});
}
//删除数据
DB.prototype.DeleteData = function(sql){
	this.db.transaction(function (t) {
	    t.executeSql(
			sql,
			[],
			function(t,result){
				alert('操作成功！');
			},
			function(t,error){
				alert('操作失败：'+error.message);
			}
	    ) ;
	});
}
//更新数据
DB.prototype.UpdateData = function(sql){
	this.db.transaction(function (t) {
	    t.executeSql(
			sql,
			[],
			function(t,result){
				alert('操作成功！');
			},
			function(t,error){
				alert('操作失败：'+error.message);
			}
	    ) ;
	});
}
//查询数据
DB.prototype.QueryData = function(sql,callback){
	this.db.transaction(function (t) {
	    t.executeSql(
			sql,
			[],
			function(t,result){
				//result数据类型为SQLResultSet，相当于C#中的datatble类型
				//获取result行集合：result.rows
				//rows 有两个属性：length、item
				//获取第一行字段为name的数据：result.rows.item(0).name
				callback(result);
			},
			function(t,error){
				alert('操作失败：'+error.message);
			}
	    ) ;
	});
}
//删除表
DB.prototype.DropTable = function(tablename){
	this.db.transaction(function(t){
		t.executeSql(
			'drop table if exists '+tablename+'',
			[],
			function(t,result){
				alert('操作成功！');
			},
			function(t,error){
				alert('操作失败：'+error.message);
			}
		);
	});
}
