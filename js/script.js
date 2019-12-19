'use script';

{
  //必要な要素を取得
  const question=document.getElementById('question');
  const container=document.getElementById('container');
  const entrance=document.getElementById('entrance');
  const target=document.getElementById('target');
  const choices=document.getElementById('choices');
  const checkBtn=document.getElementById('checkBtn');
  const nextBtn=document.getElementById('nextBtn');
  const result=document.getElementById('result');
  const scored=document.getElementById('scored');
  const countDown=document.getElementById('countDown');
  const quizSet=shuffle([
    {q:'進撃の〇〇?',c:['巨人','鬼滅','銀魂']},
    {q:'一番発行部数が少ないのは?',c:['ナルト','ワンピース','ドラゴンボール']},
    {q:'HUNTER✖︎HUNTERの作者は?',c:['富樫義博','富樫勇樹','唐辛子']},
    {q:'興行収入が一番高かったのは?',c:['千と千尋の神隠し','君の名は','アナと雪の女王']},
    {q:'アンパンマンのジャムおじさんとバタコさんは?',c:['妖精','人間','幽霊']},
  ]);
  let currentNum=-1;//調整でマイナス１にした
  let score=0;
  let checked=false;//まだ判定してません。
  let startTime=0;
  let d;
  let s;
  let timeoutId;
  
  //必要な関数
  function shuffle(arr) {
    for (let i=arr.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));//arr.lengthとしてはだめ！
      [arr[j],arr[i]]=[arr[i],arr[j]];//右辺のiをjにjiに分割代入している。
    }
    return arr;
  }
  
  function setQuiz() {
    startTime=Date.now();//countUp()する直前の時刻を記録する必要がある
    countUp();
    currentNum++;//前でsetQuiz();に必要な変数を更新する。
    question.textContent=quizSet[currentNum].q;
    while(choices.firstChild) {//問題をセットする前に前の問題を消去する
      choices.removeChild(choices.firstChild);
    }
    const shuffledChoices=shuffle([...quizSet[currentNum].c])
    shuffledChoices.forEach(choice=>{//問題文を生成して表紙する
      const li=document.createElement('li');
      li.textContent=choice;
      choices.appendChild(li);
    });
    if(currentNum===quizSet.length-1) {//最後のフェーズでボタンを「結果判定」に変える
      nextBtn.textContent='結果判定';
    }
  }
  
  function checkAnswer(answer) {
    checked=true;//判定しました。
    if(answer===quizSet[currentNum].c[0]) {
      score++;
      target.classList.add('correct');
      container.classList.add('correct');
    }else {
      target.classList.add('wrong');
      container.classList.add('wrong');
    }
  }
  
  function countUp() {
    countDown.classList.add('countDown');
    d=new Date(Date.now()-startTime);
    s=d.getSeconds();
    console.log(s);
    if(s===15) {
      if(currentNum===quizSet.length-1) {
        clearTimeout(timeoutId);
        result.classList.remove('hidden');
        scored.textContent=`${score}/${quizSet.length} 正解しました！`;
      }else {
        s=0;
        setQuiz();
      }
      countDown.classList.remove('countDown');
    }else {
      timeoutId=setTimeout(()=>{
        countUp();
      },15);
    }
  }
  
  //イベント
  entrance.addEventListener('click',()=>{
    entrance.classList.add('hidden');
    setQuiz();
  });
  
  checkBtn.addEventListener('click',()=>{
    countDown.classList.remove('countDown');
    clearTimeout(timeoutId);
    const answer=target.value;
    checkAnswer(answer);
    nextBtn.classList.remove('disabled');
    if(checked) {
      checkBtn.classList.add('disabled');
    }
  });
  
  nextBtn.addEventListener('click',()=>{
    if(checked===false){
      return;
    }
    checked=false;
    target.value='';
    nextBtn.classList.add('disabled');
    checkBtn.classList.remove('disabled');
    if(container.classList.contains('correct')) {
      container.classList.remove('correct');
    }else {
      container.classList.remove('wrong');
    }
    if(target.classList.contains('correct')) {
      target.classList.remove('correct');
    }else {
      target.classList.remove('wrong');
    }
    if(currentNum===quizSet.length-1) {//
      result.classList.remove('hidden');
      scored.textContent=`${score}/${quizSet.length} 正解しました！`;
    }else {
      setQuiz();
    }
  });
  
  
  
  
  
}


