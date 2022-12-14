document.title = 'Demo-智慧食堂';
// 创建App
const app = new THING.App({
    el: 'div3d',
    url: "/api/scene/7a9e313e4180bbbdc4439266",
    skyBox: 'BlueSky'
});

// 加载场景后执行
var building = null, mainPanel;
app.on('load', function () {

    building = app.buildings[0];
    mainPanle = new MainPanel(app);// 界面的类
    setupNavpanel();
    app.level.change(app.root.campuses[0]);
});

// 注册 进入室外 事件
app.on('afterEnterOutdoorsLevel', function (ev) {
    building.facades[0].visible = true;  // 显示外立面

    var pos = building.position;
    app.camera.flyTo({
        position: [pos[0] + 3, pos[1] + 43.21, pos[2] + 80],
        target: pos,
        time: 1200
    });
});

// 注册 进入建筑 事件
app.on('afterEnterBuildingLevel', function (ev) {
    building.facades[0].visible = false; // 隐藏外立面
});

// 注册 进入楼层 事件
app.on('afterEnterFloorLevel', function (ev) {
    building.facades[0].visible = false; // 隐藏外立面
    var num = ev.state.floor.indexOfBuilding;
    var pos = building.position;
    app.camera.flyTo({
        position: [pos[0] - 3, pos[1] + 20.28 + (num - 1) * 2.5, pos[2] + 56],
        target: [pos[0], pos[1] + (num - 1) * 6, pos[2] + 15.76],
        time: 1200
    });
});

function initCSS(url) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", url);
    var heads = document.getElementsByTagName("head");
    if (heads.length)
        heads[0].appendChild(link);
    else
        document.documentElement.appendChild(link);
}

// 给导航面板添加点击事件
function setupNavpanel() {
    var navPanel = mainPanle.createNavPanel();
    navPanel.on('click', function (obj, target) { // 绑定 导航树 事件
        navPanel.highLight(target);
        if (obj == '全景') {
            app.level.change(app.root.campuses[0]);
        } else {
            if (obj.name.indexOf('层') > -1) {
                var num = obj.name.substring(0, 1);
                var floor = building.floors[num];
                // navPanel.pathHighLight('全景.建筑.' + num + '层');
                app.level.change(floor);
            } else {
                // navPanel.pathHighLight('全景.' + obj.name);
                app.level.change(app.root.campuses[0]);
            }
        }
    })
}

class MainPanel {
    constructor(app) {
        this.app = app;
        this.nav_tree = {   // 导航树对象
        buildings: [{ name: "建筑", floors: [{ name: "1层", }, { name: "2层", }] }],
        outdoor: { name: '室外' }
        }
        this.panels_store_chineseFood = [];
        this.panels_store_drink = [];
        this.panels_num_waiting =[];

        this.toolBar = null;
        this.toolImgs = {};
        this.isExpandBuilding = false;

        this.createUIOnObjs();        // 创建 gui 面板
        this.createToolsPanel();

        this.building = this.app.buildings[0];
    }

    // 创建导航面板
    createNavPanel() {
        var main_panel = new THING.widget.NavPanel();
        main_panel.setPosition(100, null, null, 0);  // 设置面板 位置 (left/bottom/right/top)
        main_panel.addAppTree('全景', this.nav_tree); // 创建导航树
        return main_panel;
    }

    // 创建工具面板
    createToolsPanel() {
        var that = this;
        var baseURL = "https://www.thingjs.com/static/images/uBuilding/";
        this.toolBar = THING.widget.ToolBar({ width:'164px',media: true });
        this.toolBar.data = { yptw: false, kctw: false, enterBuilding: false, expandBuilding: false };
        this.toolBar.setPosition({ right: 0, top: 60 });

        this.toolImgs.img1 = this.toolBar.addImageBoolean(this.toolBar.data, 'kctw').name('中餐炒菜').imgUrl('/uploads/wechat/640081/file/智慧食堂_20221023/chinFood.jpg');
        this.toolImgs.img2 = this.toolBar.addImageBoolean(this.toolBar.data, 'yptw').name('饮品').imgUrl('/uploads/wechat/640081/file/智慧食堂_20221023/drink.png');
        this.toolImgs.img3 = this.toolBar.addImageBoolean(this.toolBar.data, 'enterBuilding').name('进入建筑').imgUrl(baseURL + 'jz.png');
        this.toolImgs.img4 = this.toolBar.addImageBoolean(this.toolBar.data, 'expandBuilding').name('楼层展开').imgUrl(baseURL + 'zk.png');

        this.toolImgs.img1.on('change', function (boolValue) { that.onChangeImageButton('enterBuilding', boolValue); });
        this.toolImgs.img2.on('change', function (boolValue) { that.onChangeImageButton('enterBuilding', boolValue); });
        this.toolImgs.img3.on('change', function (boolValue) { that.onChangeImageButton('enterBuilding', boolValue); });
        this.toolImgs.img4.on('change', function (boolValue) { that.onChangeImageButton('expandBuilding', boolValue); });
    }

     // 处理工具条按钮
    onChangeImageButton(key, boolValue) {
        var that = this;
        if (key == "enterBuilding") { // 进入建筑/室外
            this.resetExpand();
            var name = boolValue ? '返回室外' : '进入建筑';
            this.toolImgs.img3.name(name);
            if (boolValue)
                this.app.level.change(app.buildings[0]);
            else
                this.app.level.change(app.root.campuses[0]);

        } else if (key == "expandBuilding") { // 楼层横向展开
            this.app.level.change(app.buildings[0]); // 进入建筑
            if (boolValue) {
                this.building.expandFloors({
                    'time': 1000,
                    'length': 10,
                    'horzMode': false,
                    'hideRoof': true,
                    'complete': function () { that.isExpandBuilding = true; }
                })
            } 
            else {
                this.building.unexpandFloors({
                    'time': 500,
                    'complete': function () { that.isExpandBuilding = false; }
                })
            }

        }
         else {
            this.resetExpand();
            if (key == "kctw") { // 中餐
                this.panels_store_chineseFood.forEach(function (panel) { panel.show(boolValue); });
            } else if (key == "yptw") { // 饮品
                this.panels_store_drink.forEach(function (panel) { panel.show(boolValue); });
            } else if (key == 'pdrs') { // 排队人数
                this.panels_num_waiting.forEach(function (panel) { panel.show(boolValue); });
            }
        }
    }
    

    // 展开的楼层收回去
    resetExpand() {
        var that = this;
        if (this.isExpandBuilding) {
            this.toolBar.data.expandBuilding = false;
            this.building.unexpandFloors({
                'time': 500,
                'complete': function () { that.isExpandBuilding = false; }
            })
        }
    }

    // 根据不同类型创建样式
    createPanels(type) {
        var obj = {};
        var that = this;
        var gui = new THING.widget.Panel({ name: type, opacity: 0.8, cornerType: 's2c5', width: '120px', hasTitle: true});
        gui.remember(obj);
        gui.show(false);
        switch (type) {
            case "快餐摊位":
                that.panels_store_chineseFood.push(gui);
                break;
            case "饮品摊位":
                that.panels_store_drink.push(gui);
                break;
        }
        return gui;
    }

    // 为3d物体添加面板
    createUIOnObj(objs) {
        var that = this;
        objs.forEach(function (obj) {
            that.app.create({
                type: 'UI',
                parent: obj,
                el: that.createPanels(obj.custom['物体类型']).domElement,
                offset: [0, 1, 0],
                pivot: [0.5, 1]
            })
        })
    }

    // 收集需要加面板的 obj 并为其添加面板
    createUIOnObjs() {
        this.createUIOnObj(app.query('[物体类型=快餐摊位]'));
        this.createUIOnObj(app.query('[物体类型=饮品摊位]'));
    }
}


/**
 * ajax请求数据
 */
function update() {
    // ***如设置服务器的CORS，实现跨域访问。会更简单***
    // ***下例采用的不设置CORS的跨域实现方案***
    // 请求传入参数为 { "dataCount": len }
    // 服务器返回的数据格式为 callback({"state":"success","data":{temper: '21℃', humi: '22%', power: '10kWh'}})

    var len = siloHouse.length;  // 粮仓数量
    $.ajax({
        type: "get",
        url:"https://3dmmd.cn/monitoringData",
        //url: "https://dix.thingjs.com/10189/http/rest",
        url:"http://localhost:8080/NNU_digital_canteen/test.js",
        data: { "dataCount": len },
        dataType: "jsonp",
        jsonpCallback: "callback",
        success: function (d) {
            console.log(d);
            siloHouse[i].monitorData.temper = d.name;
            siloHouse[i].monitorData.humi = d.age;
            for (var i = 0; i < len; i++) {
                // 更新粮仓物体上的自定义属性monitorData相关信息
                siloHouse[i].monitorData.temper = d.data.name;
                siloHouse[i].monitorData.humi = d.data.age;
            }
        }
    });
}
