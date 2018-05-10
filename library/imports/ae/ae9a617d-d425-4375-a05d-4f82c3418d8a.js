"use strict";
cc._RF.push(module, 'ae9a6F91CVDdaBdT4LDQY2K', 'Game');
// script/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        overNode: cc.Node,
        startBtn: cc.Node,
        tailPrefab: cc.Prefab,
        scoreLabel: cc.Node,
        addTailTime: 2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.snakeHeadNode = cc.find("snakeHeadNode", this.node._children[0]);
        this.snakeHeadNodeJs = this.snakeHeadNode.getComponent("HeroControl");
        this.snakeHeadNodeJs.init({ GameJs: this });
        this.addTime = 0;
        this.isAddTail = false;
        this.tailList = new Array();
    },
    start: function start() {},
    update: function update(dt) {
        this.addTime += dt;
        if (this.addTime >= this.addTailTime && this.isAddTail) {
            this.addTail();
            this.addTime = 0;
        }
    },


    exitGame: function exitGame() {
        cc.game.end();
    },

    startGame: function startGame() {
        this.deleteTailList();
        this.overNode.active = false;
        this.snakeHeadNodeJs.reset();
        this.startBtn._children[0]._components[0].string = "再来一局";
        this.isAddTail = true;
    },

    gameOver: function gameOver() {
        this.overNode.active = true;
        this.scoreLabel._components[0].string = "分数：" + this.snakeHeadNodeJs.grtScore();
        this.isAddTail = false;
    },

    addTail: function addTail() {
        var node = cc.instantiate(this.tailPrefab);

        node.parent = this.node._children[0];
        var pos = cc.v2(Math.random() * 1220 - 610, Math.random() * 660 - 330);
        cc.log("Math.random : " + Math.random() + "POS : " + pos);
        node.setPosition(pos);
        node.color = new cc.Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 255);
        cc.log("color: ", node.color);
        this.tailList.push(node);
    },

    deleteTailList: function deleteTailList() {
        while (this.tailList.length) {
            this.tailList[this.tailList.length - 1].destroy();
            this.tailList.pop();
        }
    }
});

cc._RF.pop();