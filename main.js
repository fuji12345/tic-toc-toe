
class Table{
    
    constructor(board){
        this.board = board;
        this.turn = 1;
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

        //空きマスのチェック
        if(this.turn === 9) return false;

        //横のチェック
        for(let i=0; i<3; i++){
            if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]){
                return false; 
            }
        }

        //縦のチェック
        for(let j=0; j<3; j++){
            if (this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]){
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
        <h1>Tic-Tac-Toe</h1>
        <div class="d-flex align-items-center justify-content-around col-8">
            <div class="col-6">
                <button id="vscpu" class="btn btn-primary btn-block">VS CPU</button>
            </div>
            <div class="col-6">
                <button id="vsfriend" class="btn btn-primary btn-block">VS Friend</button> 
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
    `;

    container.querySelectorAll("#displayBoard")[0].append(View.createInitialBoard(table));

    return container;
   }

   static createResultPage(winner) {
    let container = document.createElement("div");
    container.classList.add("vh-100", "text-center", "d-flex", "flex-column", "justify-content-center");
    container.innerHTML = 
    `
    <h1>Winner</h1>
    <h1>${winner}</h1>
    <div class="d-flex justify-content-center">
        <div class="col-6">
            <buttton id="restart" class="btn btn-primary btn-lg btn-block">
                restart
            </buttton>
        </div>
        <div class="col-6">
            <buttton id="finish" class="btn btn-primary btn-lg btn-block">
                finish
            </buttton>
        </div>
    </div>
    `;
    return this.config.resultPage.append(container);
   }

   static createInitialBoard(table) {
    let container = document.createElement("div");
    for(let i=0; i<table.board.length; i++){
        let rowContainer = document.createElement("div");
        rowContainer.classList.add("d-flex");
        for(let j=0; j<table.board[0].length; j++){
            let area = document.createElement("div");
            area.classList.add("col-4", "border");
            area.innerHTML = 
            `
            <div id="${""+i+j}">
                <p>${table.board[i][j]}</p>
            </div>
            `;
            area.addEventListener("click", function() {
                //Controller.InputMark(board)→モデル内のボード情報の更新と更新後のView関数を実行させる
                Controller.changeTurn(table);
                alert(area.innerHTML)
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

    static moveMainToFinish() {
        View.config.mainPage.classList.add("d-none");
        View.createResultPage();

        let restart = View.config.resultPage.querySelectorAll("#restart")[0].addEventListener("click", function() {
            View.config.resultPage.classList.add("d-none");
            alert("ブラウザをリロードしてください");
        })
        let finish = View.config.resultPage.querySelectorAll("#finish")[0].addEventListener("click", function() {
            View.config.resultPage.classList.add("d-none")
        })
    }

    static changeTurn(table) {
        table.advanceTurn();
        let nextTurn = table.turn;
        let player = Table.firstOrSecond(nextTurn);
        View.changePlayer(player);
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
