
class Table{
    
    /*
    プレイヤー数（二人対戦かcpuか？）を受け取る
    3×3のボードを作成し、viewに描画させる

    管理内容
    -ボードの状態(どこに○×が書いてあるか)
    -今が先行か後攻か
    -controllerからボード上のマスクリック通知が来たら、マスの状態を更新して、viewに描画させる

     */
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
}

class Controller {

    static selectGame() {
        View.createStartPage();
        let vsFriendBtn = View.config.initialPage.querySelectorAll("#vsfriend")[0].addEventListener("click", function() {
            alert("click")
            //Model.createTable(friend);
        })
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