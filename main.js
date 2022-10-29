class Table{
    
    constructor(board){
        this.board = board;
        this.turn = 1;
        this.isDraw = false;
    }
    static firstOrSecond(turn){
        if(turn % 2 === 0) return "後攻"
        else return "先攻"
    }
    advanceTurn() {
        this.turn += 1;
    }
    /*
    プレイヤー数（二人対戦かcpuか？）を受け取る
    3×3のボードを作成し、viewに描画させる
    管理内容
    -ボードの状態(どこに○×が書いてあるか)
    -今が先行か後攻か
    -controllerからボード上のマスクリック通知が来たら、マスの状態を更新して、viewに描画させる
     */
    confirmWin() {
        //横のチェック
        for(let i=0; i<3; i++){
            if (this.board[i][0] !== 0 && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                return false; 
            }
        }
        //縦のチェック
        for(let j=0; j<3; j++){
            if (this.board[0][j] !== 0 && this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]){
                return false; 
            }
        }
        //斜めのチェック
        if(this.board[1][1] !== 0){
            if(this.board[1][1] === this.board[0][0] && this.board[1][1] === this.board[2][2]){
                return false;
            }else if(this.board[1][1] === this.board[0][2] && this.board[1][1] === this.board[2][0]){
                return false;
            }
        }
        //空きマスのチェック、9マス目で勝敗が決まらなかった場合はtable.isDrawをtrueに変更する。→結果画面の表示のため
        if(this.turn === 9){
            this.isDraw = true;
            return false;
        }
        return true;
    }
    
}
class Board{
    static createBoard() {
        let board = new Array(3);
        for(let i=0; i<board.length; i++){
            board[i] = new Array(3).fill(0);
        }   
        return board;
    }
}
class View {
    /*
    必要な画面
    -ゲームスタート画面（1人プレイか2人プレイを選択）
    -ボード画面（main）
    -結果画面
    必要な描画
    -選択したマスに○×を描画する
    -先行/後攻の切り替わりを描画する
    
    */ 
    static config = {
        initialPage : document.getElementById("initialPage"),
        mainPage: document.getElementById("mainPage"),
        resultPage: document.getElementById("resultPage")
    }
   static createStartPage() {
        let container = document.createElement("div");
        container.classList.add("vh-100", "d-flex", "flex-column", "align-items-center", "justify-content-center", "text-center");
        container.innerHTML = 
        `
        <h1 class="">Tic-Tac-Toe</h1>
        <br>
        <img class="startImgß" src="https://codebrainer.azureedge.net/images/tic-tac-toe_04.png" height="350" width="350">
        <div class="d-flex align-items-center justify-content-around">
            <br><br><br>
            <div class="col-7">
                <button id="vscpu" class="btn btn-danger btn-block btn-lg py-3">VS CPU</button>
            </div>
            <div class="col-7">
                <button id="vsfriend" class="btn btn-primary btn-block btn-lg py-3">VS Friend</button> 
            </div>
        </div>
        `;
    return this.config.initialPage.append(container);
   }
   static createMainPage(table) {
    let container = document.createElement("div");
    container.classList.add("vh-100", "d-flex", "flex-column", "align-items-center", "justify-content-center");
    container.innerHTML = 
    `
    <div id="turn">
        <h2>先攻のターン</h2>
    </div>
    <div id="displayBoard">
    </div>
    <div class="d-flex align-items-center justify-content-around mt-4">
        <div class="col-7">
            <buttton id="home" class="btn btn-outline-primary btn-block btn-lg py-3">Home</buttton>
        </div>
        <div class="col-7">
            <buttton id="reset" class="btn btn-outline-danger btn-block btn-lg py-3">Reset</buttton>
        </div>
    </div>  
    `;
    container.querySelectorAll("#displayBoard")[0].append(View.createInitialBoard(table));
    return container;
   }
   static createResultPage(table) {
    let container = document.createElement("div");
    container.classList.add("vh-100", "d-flex", "align-items-center", "justify-content-center", "text-center");
    let winner = "";
    if(table.isDraw){
        winner = "Draw";
    }else{
        winner = "Winner: " + Table.firstOrSecond(table.turn);
    }
    container.innerHTML = 
    `
    <div class="col-5 d-flex flex-column align-items-center justify-content-center">
        <h1>${winner}</h1>
        <div class="d-flex align-items-center justify-content-around mt-4">
            <div class="col-7">
                <buttton id="restart" class="btn btn-primary btn-block py-5">ReSTART</buttton>
            </div>
            <div class="col-7">
                <buttton id="finish" class="btn btn-secondary btn-block py-5">Finish</buttton>
            </div>
        </div>
    </div>
    `;
    return this.config.resultPage.append(container);
   }
   static createInitialBoard(table) {
    let container = document.createElement("div");
    for(let i=0; i<table.board.length; i++){
        let rowContainer = document.createElement("div");
        rowContainer.classList.add("d-flex", "justify-content-center");
        for(let j=0; j<table.board[0].length; j++){
            let area = document.createElement("div");
            area.classList.add("col-10", "board-border","text-center");
            area.innerHTML = 
            `
            <div id="${""+i+j}">
                <div></div>
            </div>
            `;
            area.addEventListener("click", function() {
                if(table.board[i][j] == 0){
                    let player = Table.firstOrSecond(table.turn);
                    if(player === "先攻") {
                        area.innerHTML =
                        `
                        <div id="${""+i+j}" class="text-primary pt-3 d-flex justify-content-center aligin-items-center">
                            <p class="circle">○</p>
                        </div>
                        `;
                        table.board[i][j] = 1;
                        Controller.startGame(table);
                    }
                    if(player === "後攻") {
                        area.innerHTML =
                        `
                        <div id="${""+i+j}" class="text-danger pt-3 d-flex justify-content-center aligin-items-center">
                            <p class="cross">×</p>
                        </div>
                        `;
                        table.board[i][j] = -1;
                        Controller.startGame(table);
                    } 
                }
            })
            rowContainer.append(area);
            
        }
        container.append(rowContainer);
    }
    return container;
   }
   static changePlayer(player) {
    let turn = document.getElementById("turn");
    turn.innerHTML =
    `
    <h2>${player}のターン</h2>
    `;
   }
}
class Controller {
    static selectGame() {
        View.createStartPage();
        let vsFriendBtn = View.config.initialPage.querySelectorAll("#vsfriend")[0].addEventListener("click", function() {
            let table = new Table(Board.createBoard());
            Controller.moveInitialToMain(table);
        })
    }
    static moveInitialToMain(table) {
        View.config.initialPage.classList.add("d-none");
        View.config.mainPage.append(View.createMainPage(table));
    }
    static moveMainToFinish(table) {
        View.config.mainPage.classList.add("d-none");
        View.createResultPage(table);

        let restart = View.config.resultPage.querySelectorAll("#restart")[0].addEventListener("click", function() {
            View.config.resultPage.innerHTML = "";
            View.config.mainPage.classList.remove("d-none");
            View.config.mainPage.innerHTML = "";
            View.config.mainPage.append(View.createMainPage((new Table(Board.createBoard()))));
        })

        let finish = View.config.resultPage.querySelectorAll("#finish")[0].addEventListener("click", function() {
            View.config.resultPage.classList.add("d-none");
            location.reload();
        })
    }

    static changeTurn(table) {
        table.advanceTurn();
        let nextTurn = table.turn;
        let player = Table.firstOrSecond(nextTurn);
        View.changePlayer(player);
    }
    static startGame(table) {
        let flag = table.confirmWin();
        if (flag) {
            Controller.changeTurn(table);
        }else{
            this.moveMainToFinish(table);
        }
    }
    /*
    必要な機能
    スタート画面
    -1人プレイが2人プレイかをmodelに送る
    main画面
    -ボード上のマスがクリックされた時にmodelに通知
    結果画面
    -もう1度遊ぶ？があれがmodelに通知
    */
}
Controller.selectGame();