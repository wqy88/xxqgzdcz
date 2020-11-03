/* 
行数比较多用这个快捷键折叠全部代码块：ctrl + k ctrl + 0 ;但结构上还算移动 
*/
auto.waitFor();
console.log("开启无障碍服务=true");
console.log("开启截屏权限=" + requestScreenCapture());

var dW = device.width; //设备宽度
var dH = device.height; //设备高度

function star() {
    // 打开学习强国
}
star.prototype.open = function () {
    while (!id("home_bottom_tab_icon_large").findOne(2000)) {
        toast('正在打开学习强国');
        launchApp("学习强国"); //打开学习强国 
        sleep(5000);
    }
    toast('已经打开学习强国');
    return true;
}
/***********************************************************************************/
// 首页
function home() {

}
home.prototype.openMy = function () {
    // 打开我的
    while (!text("我的").drawingOrder(2).findOne(3000)) {
        toast("正在打开\"我的\"页面");
        var tag = text("我的").depth(13).drawingOrder(3).findOne(2000);
        var xy = tag.bounds();
        console.log("点击\"我的\"按钮=" + tag.click());
        sleep(5000);
    }
}
home.prototype.opppenXueXi = function () {
    // 打开学习页面
    var btn = id("home_bottom_tab_icon_large").findOne();
    var xy = btn.bounds();
    click(xy.centerX(), xy.centerY());
}
home.prototype.openAllChannels = function () {
    // 打开全部频道
    while (!text("全部频道").drawingOrder(2).findOne(1000)) {
        array = depth(16).drawingOrder(1).clickable(true).find()
        /* 这儿控件相同条件的都很相似所以使用数组 */
        array[3].click()
        sleep(1000);
    }
    return true;
}
home.prototype.openBaiLing = function () {
    // 打开百灵
    while (!text("百灵").findOne(2000)) {
        sleep(2000);
    }
    text("百灵").findOne().parent().parent().parent().click()
    toast("打开了百灵(视频学习)");
    console.log("打开了百灵(视频学习)");
    sleep(2000);
}
home.prototype.openPoint = function () {
    // 从首页打开积分页面
    while (!text("学习积分").drawingOrder(2).findOne(3000)) {
        toast("正在打开\"积分\"页面");
        console.log("点击\"积分\"按钮=" + clickCenter(text("积分").depth(14).drawingOrder(1).findOne(2000).parent()));
        sleep(5000);
    }
    toast("已经打开\"积分\"页面，正在准备下一步，等待时间");
}
/***********************************************************************************/
//首页-->我的
function my() {
    // 我的页面
}
my.prototype.openSubscribe = function () {
    // 打开订阅页面
    while (!(text("我的订阅").exists() && text("添加").exists())) {
        toast("正在打开我的订阅页面");
        text("订阅").drawingOrder(3).findOne(2000).click();
        sleep(2000);
    }
}
/***********************************************************************************/
//首页-->百灵
function baiLing() {
    // 流式版页面
}

baiLing.slide = function () {
    //向上滑动
    /* 
    起始滑动位置不能太靠仅手机底部也就是要小于DH些
    时间间隔0.4s这也是比较类似于手动操作的效果
    */
    var TimeLag = 400;
    swipe(dW / 2, dH - dH / 4, dW / 2, 3, TimeLag);
}
baiLing.getTitle = function () {
    // 获取视频标题
    var title = className("android.widget.TextView").depth(16).clickable(true).findOne(2000).text();
    return title;
}
baiLing.prototype.watchVideo = function () {
    // 打开一个
    var List = className("android.widget.FrameLayout").depth(24).drawingOrder(1).find();
    for (var i = 0; i < List.length; i++) {
        if (List[i].bounds().width() == dW) {
            return (List[i].click());
        }
    }
}
baiLing.prototype.slide = function () {
    TimeLag = 2000;
    swipe(dW / 2, dH - dH / 5, dW / 2, dH / 5, TimeLag);
}
/***********************************************************************************/
// 首页-->全部频道
function allChannels() { }
allChannels.prototype.openChanne = function () {
    //在全部频道查找内容并打开
    while (true) {
        if (text("订阅").findOne(3000)) {
            sleep(2000);
            text("订阅").findOne().parent().parent().click();
            return true;
        }
    }
}
allChannels.prototype.openlocal = function () {
    /* 注：此按钮固定排序为3 */
    var localbtn = clickable(false).depth(11).drawingOrder(1).find()[3];
    localbtn.parent().parent().click();
    return localbtn.text(); //返回地区名字
}
/***********************************************************************************/
function dingYuepage() { }
dingYuepage.openNews = function () {
    var List = className("android.widget.TextView").find();
    for (var i = 0; i < List.length; i++) {
        if (List[i].id() == "cn.xuexi.android:id/general_card_title_id") {
            var name = List[i].text();
            k = List[i];
            sleep(4000);
            if (k.parent().parent().clickable() == true) {
                k.parent().parent().click();
                // console.log("222");
            } else if (k.parent().parent().parent().clickable() == true) {
                k.parent().parent().parent().click();
                // console.log("333");
            } else if (k.parent().parent().parent().parent().clickable() == true) {
                k.parent().parent().parent().parent().click();
                // console.log("444");
            }
            sleep(2000);
            return name; //返回文章名字            
        }
    }
    return false;
}
dingYuepage.slide = function () {
    //upward sliding向上滑动
    TimeLag = 1000;
    swipe(dW / 2, dH - dH / 4, dW / 2, dH / 4, TimeLag); //直上滑动
}
/***********************************************************************************/
//首页-->我的-->订阅(订阅公众号)
function mySubscribe() {
    // 我的订阅页面
}
mySubscribe.prototype.add = function () {
    text("添加").clickable(true).findOne(2000).click();
}
/***********************************************************************************/
// 首页-->我的-->订阅-->添加
function addSubscribe() { }
addSubscribe.slide = function () {
    TimeLag = 2000;
    swipe(dW / 2, dH - dH / 4, dW / 2, dH / 4, TimeLag); //直上滑动
}
addSubscribe.add = function (di_c) {
    var dnum = 0;
    var count = di_c; //订阅个数
    while (dnum <= count) {
        var list = className("android.widget.LinearLayout").depth(15).clickable(true).drawingOrder(3).find();
        for (var i = 0; i < list.length; i++) {
            var tag = list[i].bounds();
            if (tag.width() / tag.height() == (20 / 11)) {
                var img = captureScreen();
                var duigou = list[i].children()[0];
                var ttg = duigou.bounds();
                console.log(images.pixel(img, ttg.centerX(), ttg.centerY()))
                if (images.pixel(img, ttg.centerX(), ttg.centerY()) == -1) {
                    list[i].click();
                    toast("订阅" + ++dnum);
                    console.log("订阅" + dnum);
                    sleep(600);
                }
                img.recycle(); /* 回收图片 */
            }
            if (dnum == count) {
                return true;
            }
        }
        sleep(500);
        this.slide()
    }
}
/***********************************************************************************/
function learningplatform() {

}
function video() {
    // 普通视频界面
}

function photo() {
    // 图片界面
}
function articleAlbum() {
    // 文章专辑
}
function audioalbum() {
    // 声音专辑
}


function analysisPage() {
    // 分析是否是普通文章页面,不是则返回
    // 为页面类型编号 文章=1;文章专题=2;图片=3;音频合辑=4;文章已下线=9;
    tag = 1
    if (text("条音频").findOne(500)) {
        console.log("现在位于音频合辑页面，等待返回");
        return 4;
    }
    if (textContains("1/").findOne(500) && className("android.widget.ImageView").depth(9).drawingOrder(1).clickable(true).findOne(500)) {
        // 使用两个条件，第一个是图片查看标记，第二个是返回按钮
        toast("现在位于图片页面，等待返回");
        console.log("现在位于图片页面，等待返回");
        return 3;
    }
    if (!className("android.widget.ImageView").depth(11).drawingOrder(1).clickable(true).findOne(500)) {
        // 是依据返回按钮进行判断
        console.log("专题页面");
        return 2;
    }
    return tag; //默认返回真tag=1
}

/***********************************************************************************/
function article() {
    // 普通文章界面
}
article.getTitle = function () {
    // 注：通过className&depthor id 获取标题出现获取不到情况
    // 一共提供两种可行方案
    // 1. (不具有通用性，在某些页面无此关键字，比如新华社文)
    // 注：通过className&depthor id 获取标题出现获取不到情况
    if (textMatches(".*(作者|来源).*").findOne(2000)) {
        var tit = textMatches(".*(作者|来源).*").findOne(1000)
        title_head = tit.parent();
        title = title_head.child(0).text();
        return title;
    }
    if (textMatches(".*(年*月*日).*").findOne(2000)) {
        // 2.采用父子关系获取
        var tit = textMatches(".*(年*月*日).*").findOne(1000);
        var title = tit.parent().parent().child(1).child(0).text();
        return title;
    }
    // 如果没get到标题返回false
    return true;

}
article.slide = function () {
    // 上下滑动
    TimeLag = 2000;
    var i = 0;
    while (true) {
        sleep(2000);
        if (i % 2 == 0) {
            //(1/2,1/4)>(3/4,3/4)
            swipe(dW / 2, dH - dH / 4, dW - dW / 4, dH / 4, TimeLag); //左上滑动
        } else {
            //(1/2,3/4)>(3/4,1/4)
            swipe(dW / 2, dH / 4, dW - dW / 4, dH - dH / 4, TimeLag); //右下滑动
        }
        i++;
    }
}

article.collection = function () {
    // 收藏
    className("android.widget.ImageView").drawingOrder(3).depth(10).findOne().click();
    // 2020年9月13日：修改
    sleep(1600);
    if (text("我知道了").exists()) {
        text("我知道了").click(); //如果出现collectionArticles提示关掉提示
    }
    sleep(1600);
    return;
}
article.share = function () {
    // 分享
    className("android.widget.ImageView").drawingOrder(4).depth(10).findOne().click();
    textContains("分享到短信").id("txt_gv_item").waitFor();//等待窗体弹出
    sleep(300)
    textContains("分享到短信").id("txt_gv_item").findOne().parent().click();//点击分享到短信
    sleep(300);
    launchApp("学习强国"); //打开学习强国 
    /* 因为选择到分享到短信，可能在短信编辑框存在内容的情
    况下无法正常返回 ，所以重新打开app
    这样可能再次打开已经不再原来的页面而是在推荐页面
    这种情况下阅读依然是正常的，只是每次需要重复几次
    */
    return;
}
/***********************************************************************************/
function readAndCollection(readcout, collectcount, sharecount, readtime) {
    var firstpage = new home();
    var channels = new allChannels();

    var r_count = 0; //计数阅读数目
    var c_count = 0; //计数收藏数目
    var s_count = 0;//计数分享数目
    var r_time = readtime * 1000; //转换阅读时间到毫秒
    var arr = new Array(); //存储文章题目

    firstpage.opppenXueXi(); //在首页点击学习按钮
    firstpage.openAllChannels(); //在首页打开全部频道
    channels.openChanne(); //在全部频道打开订阅
    sleep(1000);

    while (r_count < readcout) {
        dingYuepage.slide(); //订阅页面滑动
        sleep(1000);
        var name = dingYuepage.openNews();
        if (!name) {
            // console.log(name);//false
            /* 如果没有打开任何一篇文章 */
            continue;
        }
        if (analysisPage() == 1) {
            // arr[arr.length] = article.getTitle();//早期文章内获取标题
            if (arr.indexOf(name) == -1) {
                /* 如果标题不再数组内才进行阅读 */
                arr[arr.length] = name;
                console.log(arr[arr.length - 1]);
                r_count = arr.length;
                var slide = threads.start(
                    function () {
                        /* // 上下滑动 */
                        // console.log("上下滑动");
                        for (var i = 0; ; i++) {
                            sleep(2000);
                            if (i % 2 == 0) {
                                //(1/2,1/4)>(3/4,3/4)
                                swipe(dW / 2, dH - dH / 4, dW - dW / 4, dH / 4, TimeLag); //左上滑动
                            } else {
                                //(1/2,3/4)>(3/4,1/4)
                                swipe(dW / 2, dH / 4, dW - dW / 4, dH - dH / 4, TimeLag); //右下滑动
                            }
                        }
                    }
                ) //开启线程上下滑动
                // 计时阅读
                console.log("计时阅读");
                sleep(r_time);
                slide.interrupt(); //停止滑动线程
                if (c_count < collectcount) {
                    // 收藏文章
                    article.collection();
                    c_count++;
                    sleep(300);
                }
                if (s_count < sharecount) {
                    article.share();
                    s_count++;
                }
            }
            back();
        }
        else {
            back();
        }
        sleep(2000);
        console.log("[已看]:" + arr.length + "\t" + "[收藏]：" + c_count + "\t" + "[分享]" + s_count);
    }
}

function watchBailing(count, time_) {
    var firstpage = new home();
    var bai_ling = new baiLing();
    var TIME = time_;
    firstpage.openBaiLing(); //在首页打开百灵页面
    bai_ling.watchVideo(); //进入播放页面
    var time_lim = threads.start(function () { // 播放一分钟防止超时(1分零2秒-6秒)
        console.log("超时检测[全周期]");
        while (true) {
            sleep(3000);
            title = className("android.widget.TextView").depth(17).drawingOrder(2).findOne(2000).text();
            str = title.replace(/[^0-9]/ig, "")
            num = parseInt(str.slice(1, -4))
            if (num > TIME) {
                console.log("已超时")
                baiLing.slide();
            }
        }
    }) //开启线程防止超时
    var con_play = threads.start(function () { // 防止暂停
        console.log("暂停检测[全周期]");
        while (true) {
            sleep(3000);
            if (text("继续播放").findOne(2000)) {
                text("继续播放").findOne(2000).click();
            }
            if (drawingOrder(6).depth(16).clickable(false).findOne(2000)) {
                /* 注：没找到可点击的空间来解锁暂停，只能用坐标 */
                click(dW / 4, dH / 2)
            }
        }
    }) //开启线程防止暂停
    var arr = new Array()
    while (arr.length <= count) {
        // console.log("[arr]:" + arr.length);
        var title = baiLing.getTitle();
        if (arr.indexOf(title) == -1) {
            arr[arr.length] = title;
            console.log(title);
            console.log("[已看]:" + arr.length);
        }
        sleep(3000);
    }
    threads.shutDownAll(); //关闭子线程
    back();
}

function openlocalchannel() {
    var firstpage = new home();
    var channels = new allChannels();
    var studyPlat = new learningplatform();

    firstpage.opppenXueXi(); //在首页点击学习按钮
    firstpage.openAllChannels(); //在首页打开全部频道
    var regionName = channels.openlocal(); //在全部频道打开本地频道
    text(regionName + "学习平台").findOne().parent().click(); //找到XX学习平台,并打开
    sleep(5000); //停留3秒
    back(); //返回首页
    console.log("[学习平台]:" + regionName);

}

/* 
    打开学习强国
    尝试启动学习APP 
*/
var begin = new star();
begin.open();// 2020年9月13日：正常



/*
    观看小视频，通过抓取时间轨统计时间
    如果小视频不超过1分钟很有可能面临视听学习时长不计时
    watchBailing(观看视频数目,观看单个最大时长)
    观看时长：按液晶显示器格式填写 183秒==>3：03==>303
    稳定性：稳定   
 */
watchBailing(7, 130);// 2020年10月6日：正常

// watchBailing(5, 105);//测试用1分05秒

/*
    阅读文章，通过sleep(times)休眠线程即使,times即为阅读时间
    通过单独线程控制上下滑动
    readAndCollection(阅读文章数目，收藏数目，分享数目，阅读每篇文章时间s)
    稳定性：中等，有卡死情况和文章下架意外
*/
// readAndCollection(60, 4, 3, 5);//test
readAndCollection(7, 4, 3, 66);// 2020年10月6日：正常
/*
    打开本地频道
    稳定性：稳定
 */
openlocalchannel();// 2020年10月6日：正常
