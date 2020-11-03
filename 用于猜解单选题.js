/* ================莱维斯坦距离计算============= */
function min(a, b) {
    return a < b ? a : b;
}
function edit(str1, str2) {
    if (str1 == null || str2 == null) {
        return 0;
    }

    var max1 = str1.length;
    var max2 = str2.length;

    //arr表示：	str1->0-max1-1;str2->0-max2-1,转换需要的最小次数
    //定义二维数组的方式，先定义一维的，每个一维数据里面的一个元素是一个数组
    var arr = new Array(max1 + 1);
    for (var i = 0; i < max1 + 1; i++) {
        arr[i] = new Array(max2 + 1);
    }
    //边界
    for (var i = 0; i < max1 + 1; i++) {
        arr[i][0] = i;
    }
    for (var j = 0; j < max2 + 1; j++) {
        arr[0][j] = j;
    }
    //状态转移计算
    for (var i = 1; i < max1 + 1; i++) {
        for (var j = 1; j < max2 + 1; j++) {
            var d;
            var temp = min(arr[i - 1][j] + 1, arr[i][j - 1] + 1);
            if (str1[i - 1] == str2[j - 1]) {
                d = 0;
            } else {
                d = 1;
            }
            //删一个，插入一个，替换三种情况下的最小转换次数
            arr[i][j] = min(temp, arr[i - 1][j - 1] + d);
        }
    }
    return arr[max1][max2]
}
/* ================莱维斯坦距离计算============= */
/* ================字符串差值计算============= */
function fun1(s1, s2) {


    console.log("[s1]" + s1)
    console.log("[s2]" + s2)
    // 求公共子串s1∩s2
    var m = s1.length
    var n = s2.length
    var sx = [];//存储差异矩阵
    var sr = [];//存储全部子串
    var sr1 = [];//存储全部子串对于s1
    var sr2 = [];//存储全部子串对于s2
    var sssr1 = [];//临时存储子串在原串S1中的位置
    var sssr2 = [];//临时存储子串在原串S2中的位置
    for (let i = 0; i < m; i++) {
        sx[i] = [];
        for (let j = 0; j < n; j++) {
            if (s1.charAt(i) == s2.charAt(j)) {
                sx[i][j] = 1;//如果对应位置相同则赋值为1
            }
            else {
                sx[i][j] = 0;//如果对应位置不同则赋值为0
            }
        }
    }
    var k = 0, l = 0, pi = 0;//pi作为标记
    while (k < m) {
        l = pi;
        while (l < n) {
            sssr1 = []
            sssr2 = []
            while (l < n && sx[k][l] == 1) {
                sssr1.push(k)
                sssr2.push(l)
                k++; l++;//向右下移位
                pi = l;//记录位置
            }
            if (sssr1.length > 0) {
                sr1.push(sssr1)
                sr2.push(sssr2)
            }
            l++;//前移一位(在列上)
        }
        k++;//扫描完了一行，换下一行
    }
    sr.push(sr1, sr2)
    /*返回子串对应的于两个母串下标*/
    return sr;
}
function fun2(s1, s2) {

    // ***注意***是求差异串s2-s1
    var ss1 = fun1(s1, s2)[1]
    // console.log("[重复子串在s2中的位置]:")
    // console.log(ss1)
    var sx = [];//存储相同位置
    var sw = [];//存储差异位置
    ss1.forEach(ar1 => {
        ar1.forEach(i => {
            sx.push(i)
        });
    });
    // console.log("[重复子串在s2中的位置]:")
    // console.log(sx)
    var j = 0
    while (j < s1.length) {
        var ss = []
        while (j < s2.length && sx.indexOf(j) == -1) {
            ss.push(j)
            j++;
        }
        if (ss.length > 0) {
            sw.push(ss)
        }
        j++;
    }
    // console.log("[差异子串在s2中的位置]:")
    // console.log(sw)
    return sw;
}
/* ================字符串差值计算============= */

/* ================字符串差值拼合============= */
function chayizhi(lis) {
    var list = fun2(lis[0], lis[1]);
    console.log(list)
    var lslx = []
    for (let i = 0; i < list.length; i++) {
        var lll = ""
        for (let j = 0; j < list[i].length; j++) {
            // console.log(list[i][j])
            lll += lis[1][list[i][j]]
            // console.log(lll)
        }
        // console.log(lll)
        lslx.push(lll)
    }
    return lslx;
}
/* ================字符串差值拼合============= */


/* ================对于单选题================= */

function xzt() {

}
xzt.prototype.slects = function () {
    // 获取选项内容
    lis = indexInParent(2).depth(23).clickable(false).find()[0];
    // console.log(lis.childCount())//选项数目
    child = lis.children();
    sles = new Array()
    for (let index = 0; index < child.length; index++) {
        sles[index] = child[index].child(0).child(2).text();
    }

    return sles;
}
xzt.prototype.gettipques = function () {
    var lis = new Array()
    lis[0] = (function () {
        // 获取题目文本
        ques = indexInParent(1).depth(23).find()[0];
        // console.log(ques.text())
        return ques.text();
    })()
    text("查看提示").findOne().parent().click();
    sleep(1000)
    lis[1] = (function () {
        var fra = indexInParent(1).depth(22).drawingOrder(0).find()[0]
        // console.log(answer.children())
        let s = "";//有些题目文本是分段的需要拼接起来
        var lisd = fra.children()
        for (let index = 0; index < lisd.length; index++) {
            if (lisd[index].text()) {
                s += lisd[index].text()
            }
        }
        return s;
    })()
    back();
    return lis;
}
xzt.prototype.mindist = function (slecs, cyz) {
    var arr = [];//保存编辑距离平均值
    arr.length = slecs.length
    for (let index = 0; index < arr.length; index++) {
        arr[index] = 0
    }
    for (let index = 0; index < slecs.length; index++) {
        for (let j = 0; j < cyz.length; j++) {
            var dist = edit(cyz[j], slecs[index]);
            // console.log(dist)
            arr[index] += dist;
        }
    }
    console.log(arr)
    var min = 0, fla = arr[0];
    for (let k = 1; k < arr.length; k++) {
        if (fla > arr[k]) {
            min = k
            fla = arr[k]
        }
    }
    // 判断距离是否相等,如果相等则猜不到任何答案，则执行其他算法
    var si = arr[0], j = 0
    arr.forEach(element => {
        if (element == si) {
            j++;
        }
    });
    if (j == arr.length) {
        return false;
    }
    else {
        return min;
    }
}
xzt.prototype.ancon = function (slecs, ans) {
    // 最后考虑答案包含在提示里
    for (let index = 0; index < slecs.length; index++) {
        if (ans.indexOf(slecs[index]) > -1) {
            return index;
        }
    }
}
/* ================对于单选题================= */
function funas() {
    if (text("单选题").exists()) {
        var xtzx = new xzt();
        var slecs = xtzx.slects()//选项内容
        // console.log("[选项内容：]")
        // console.log(slecs)
        var lis = xtzx.gettipques()//题目和提示内容
        var cyz = chayizhi(lis)// [提示-题目]  内容
        console.log("[差异内容：]")
        console.log(cyz)
        var key = xtzx.mindist(slecs, cyz)
        if (key == false) {
            key = xtzx.ancon(slecs, lis[1])
        }
        console.log(key)
        var lis = indexInParent(2).depth(23).clickable(false).find()[0];
        var child = lis.children();
        console.log(child)
        var keybtn = child[key].bounds();
        sleep(1000)
        click(keybtn.centerX(), keybtn.centerY())
        sleep(1000)
        var ctn = text("确定").findOne()
        var btn = ctn.bounds()
        click(btn.centerX(), btn.centerY())
        sleep(500)
        if (text("下一题").exists()) {
            //要支持的动作
            var ctnx = text("确定").findOne()
            var btnx = ctnx.bounds()
            click(btnx.centerX(), btnx.centerY())
        }
    }
}
funas()


