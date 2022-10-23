
class Table{
    
    /*
    プレイヤー数（二人対戦かcpuか？）を受け取る
    3×3のボードを作成し、viewに描画させる

    管理内容
    -ボードの状態(どこに○×が書いてあるか)
    -今が先行か後攻か
    -controllerからボード上のマスクリック通知が来たら、マスの状態を更新して、viewに描画させる

     */

    static createBoard() {
        let board = new Array(3);
        for(let i=0; i<3; i++){
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

   static createMainPage(board) {
    let container = document.createElement("div");
    container.classList.add("vh-100", "d-flex", "flex-column", "align-items-center", "justify-content-center");
    container.innerHTML = 
    `
    <div id="turn">
        <h2>ooのターン</h2>
    </div>
    <div id="displayBoard">
    </div>
    `;

    return container;
   }

}

class Controller {

    static selectGame() {
        View.createStartPage();
        let vsFriendBtn = View.config.initialPage.querySelectorAll("#vsfriend")[0].addEventListener("click", function() {
            let initialBorad = Table.createBoard();
            Controller.moveInitialToMain(initialBorad);
            //Model.createTable(friend);
        })
    }

    static moveInitialToMain(board) {
        View.config.initialPage.classList.add("d-none");
        View.config.mainPage.append(View.createMainPage(board));
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