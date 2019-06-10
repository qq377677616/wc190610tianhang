module.exports = { 
  //请求提示语
  "9000": "Young people wait, always come out",
  "2011": "AccessToken has expired",
  "41000":"Invalid parameter",
  "41001": "Bet amount limit exceeded",
  "41002":"Failed to update data",
  "41003": "You can bet in 100 consecutive issues at most",
  '41004':"Failed to get hash random number",
  "40000":"Sorry, an error has occurred and the markets are temporarily suspended!",
  "41005":"The current issue is closed for betting",
  "41006":"A lottery number is integer times 1000",  
  "20001": "Invalid parameter",
  "8001":"Failed to create order. Please try again.",
  "8101": "Insufficient balance.",
  "8003":"Wallet does not exist",
  "2026":"Insufficient balance. Please top up first.",
  "5100": "The bet value is not in the correct interval",
  "5101":"The current block status is incorrect and cannot be bet",
  "5102": "The bet amount exceeds the maximum bet amount",
  "5103":"The bet amount is less than zero or less than the set minimum bet amount",
  "5104":"Game has not started.",
  requestToast: {
    toast: ['Server exception, please try again later', 'Network exception, please try again later', 'Network anomaly, lottery failure']
  },  
  //幸运彩（彩票）  
  lottery: {
    //home_textScroll: ['在', '期中获得奖金', '个'],
    home_title1: 'Tickets',
    home_title2: 'Accumulated in round',
    home_title3: 'Next drawing: ',
    home_title4: 'My ticket: ',
    home_title5: 'Win chance: ',
    home_title6: 'Unit price: ',  
    home_title61: 'Tickets', 
    home_title7: 'First prize',
    home_title8: 'Check the Full List',
    home_button: 'Buy ticket',
    history_tabList: ['Lottery Draw History', 'My Records'],
    history_title1: 'Winner',
    history_title2: 'Total tickets:', 
    history_title3: 'Round',
    history_title4: 'Nickname',
    history_title5: 'Prize',
    history_title6: 'Ticket number',
    history_title7: 'Block value',
    history_title8: 'Time',
    history_title9: 'Hash',
    history_title10: ['Hash', 'Sha256Hash', 'Conversion value'],
    history_title11: 'Copy',
    history_title12: 'Verify',
    history_title13: 'To be drawn',
    history_title14: ['Payout for 1st prize', 'Payout for 2nd prize', 'Payout for 3rd prize', 'Payout for 4th prize', 'Payout for 5th prize'],
    history_title15: 'Verification',
    history_title16: 'Input hash',
    history_title17: 'Verify',
    history_title18: ['bet', 'in', 'wins', 'in round'],
    history_title19: 'Verified results',
    history_title20: 'SHA256 converted value',
    history_title21: 'First 12-digit number',
    history_title22: 'Decimal conversion',
    history_title23: 'Divided by total ticket number', 
    history_title24: 'Get drawing number',
    history_button: ['Previous round', 'Next round'],
    myRecord_title1: 'Giveaway',
    myRecord_title2: 'To be drew',
    myRecord_title3: 'Lose',
    myRecord_title4s: ['1st', '2nd', '3rd', '4th', '5th'],
    myRecord_title4: 'prize',
    myRecord_title5: 'Round',
    myRecord_title6: 'Amount',
    myRecord_title7: 'Time',
    myRecord_title8: 'Drawing number',
    myRecord_title9: 'No record',
    myRecord_title10: 'Buy',
    rule_headerTitle: 'Rules',
    rule_ulLi1: ['How to play', "The player can purchase any number of tickets. The lottery serial number is the purchase serial number, and all the players' purchase funds are put into the prize pool. Every 24H there will a lottery drawing, and each time 5 winning numbers will be drawn. The ranking is determined according to the order of drawing. The winners share the prize pool bonus according to the ranking."],
    rule_ulLi2: ['Proportion of prize', 'Ranking', 'Prize pool percentage', 'Description', 'Vary according to prize pool volume', 'Note: The remaining 3.5% of prize pool bonus is transferred to the next round.'],    
    rule_ulLi3: ['Winning numbers', "After the deadline, the first 16 bytes of the random source will be sequentially converted to get decimal number A, and then divide A by the total number of tickets in this round to get a remainder as the winning number. If the remainder is 0, the winning number is equal to the total number of tickets, and 5 winning numbers are issued in turn. If one winning number is the same as the previous one, the winning number will be abandoned, and the ranking will be added in turn until getting all 5 winning numbers. It is a 32-byte random number. The number is randomly generated according to a series of very complicated encryption algorithms. All the algorithms are publicized, and the random source can be verified.", "Please note that the platform will charge 1% of your bonus as operating fees."],
    others: ['Loading...', 'No more~', 'Cancel', 'Confirm'],
    toasts: ['Successful language switching', 'Server exception, please try again later', 'Purchase', 'Successful purchase', 'Lottery', 'Minimum input ', 'Maximum input ', 'The number of lottery tickets needed to be an integral multiple of 1000', 'The number of purchases you entered is invalid']
  },
  //时时彩
  lucky: {
    home_title1: ['5 Stars Through-pick', '5 Stars Quick-pick', '3 Stars Quick-pick', '3 Stars in 3 Combinations', '3 Stars in 6 Combinations', '2 Stars Quick-pick', '2 Stars in Combination', '1 Stars Quick-pick', 'Big/Small/Odd/Even'],
    home_title2: ['Round ', ' ends: ', 'Current stopped, waiting for next period', 'This period has ended and will reopen at 10:00'],
    home_title3: ["Pick at least 1 number for each digit. You'll win 20440 WLC if your prediction is correct digit by digit.", "Pick at least 1 number for each digit. You'll win 10000 WLC if your prediction is correct digit by digit.", "Pick at least 1 number for each digit. You'll win 1500 WLC if your prediction about last 2 digits of the result  is correct .", "Pick at least 2 numbers for each digit. You'll win 480 WLC if your prediction about last 3 digits of the result  is correct(in no particular order).", "Pick at least 3 numbers for each digit. You'll win 240 WLC if your prediction about last 2 digits of the result  is correct(in no particular order).", "Pick at least 1 number for each digit. You'll win 150WLC if your prediction about last 2 digits of the result  is correct .", "Pick at least 2 numbers for each digit. You'll win 75 WLC if your prediction about last 2 digits of the result  is correct(in no particular order).", "Pick at least 1 number. You'll win 15 WLC if your prediction about last digit of the result  is correct .", "Pick at least 1 number for each digit. You'll win 6 WLC if your prediction about the attribute of bet result's  last 2 digits is correct."],
    home_title4: 'Pick',
    home_title5: ['Round No', 'Number', 'Tens', 'Ones', 'Type', 'Round', 'Initialization', 'Have in hand', 'Result pending', 'To void', 'Big&Even', 'Big&Odd', 'Small&Even', 'Small&Odd', '3 combinations', '6 combinations', 'Latest ', ' records are presented above', 'No record'],
    home_title6: ['Big', 'Small', 'Odd', 'Even'],
    home_title7: [' Bets', 'Expected Revenue: ', 'Confirm Bets', '(The lottery was "Chongqing constant color" lottery results)'],
    home_title8: ['Selected Bets', 'Unselect All', 'Issue ', '', '', ' Stakes in Total'],
    messagebox: ['Unselect All', 'Clearing all the selected bets list will not be restored. Are you sure you want to do this?', 'Cancel', 'Confirm', 'Delete bet', 'Deleting the currently selected betting group will not be restored. Are you sure you want to do this?'],
    myRecord_headerTitle: 'Bet Records',
    home_title9: [' Issue', '', ' note', 'Time(s)', 'Bet Amount', 'Bet Time: ', 'Winning number: ', 'Submitted', 'have paid', 'Losing Lottery', 'Purchase failed', 'To void'],
    myRecord_title1: 'Go betting',
    rule_headerTitle: 'Rules',
    rule_ulLi1: ['The game is introduced', 'This "constant color" used for chongqing constant color lottery source, divided into "star color play", "size single and double play" "two star group selection" .', 'Star color play: ', 'Is divided into one star, two stars, three stars, five stars four kinds of play. "Constant color" each period lottery number for a five-digit number, divided into ten, hundred, thousand, ten thousand.'],
    rule_ulLi2: ['Game rules', '5 Stars Quick-pick:', 'Each area at least choose a number, location sequence Numbers are the same for winning, namely bonuses for 10000.', '3 Stars Quick-pick: ', 'After the location of at least three each choose a number, place the same order number is the winning bonus for: 1500.', '3 Stars in 3 Combinations: ', 'Choose at least 2 number, number and three are the same, after any order, for winning prize: 480 (after three must have the same)', '3 Stars in 6 Combinations: ', 'Choose at least 3 Numbers, Numbers and the last three, the order is not limited, that is, the prize money is 240 (the last three must not be the same)', '2 Stars Quick-pick: ', 'At least one number shall be selected for each position area in the last two positions. If the position order is the same, the prize money is 150.', '2 Stars in Combination: ', 'Choose two or more different from 0 to 9 number to ten bits, betting, any place. The betting number shall be the same as the drawing number in the current period (no restriction on the position). The single betting amount is 2 yuan. For example, when betting on the number "45", no matter the next two Numbers in the lottery are "45" or "54", they are all winners.', '1 Stars Quick-pick: ', 'The last position area is selected to a minimum of one piece, the position number is the same as the winning bonus of 15.', 'Big/Small/Odd/Even: ', 'Guess constant color "a" and "ten" these two positions "size, odd and double" play, that is, 10 natural number by "big", "small" or "single", "double" nature is divided into two groups, 0-4 for the small, 5-9 for the large, 0, 2, 4, 6, 8 for the double, 1, 3, 5, 7, 9 for the single. The punter may make a specified bet of "size, odd and even" on the digits of "one place and ten place". The number position, nature of the bet and the number position, nature of the same winning. Single note betting amount of 2 yuan, single note winning amount of 6 yuan.'],
    rule_ulLi3: ['Winning rules', '1. one star is the last place of the lottery number (that is, the single note of 15 yuan;', '2. two star is the lottery number after the two (that is, ten, single note of 150 yuan;', '3. Samsung adopts the last three digits of the lottery number (i.e. the hundreds, tens and ones), and the single note is 10,000 yuan; ', '4. Five stars represents all five (ten thousand, thousand, hundred, ten, and one) winning 100,000 yuan in a single note. No matter how many stars are placed, the amount of each bet is 6 yuan.'],
    rule_ulLi2: ['Game rules', '5 Stars Quick-pick:', 'Each area at least choose a number, location sequence Numbers are the same for winning, namely bonuses for 10000WLC.', '3 Stars Quick-pick: ', 'After the location of at least three each choose a number, place the same order number is the winning bonus for: 1500WLC.', '3 Stars in 3 Combinations: ', 'Choose at least 2 number, number and three are the same, after any order, for winning prize: 480WLC (after three must have the same)', '3 Stars in 6 Combinations: ', 'Choose at least 3 Numbers, Numbers and the last three, the order is not limited, that is, the prize money is 240WLC (the last three must not be the same)', '2 Stars Quick-pick: ', 'At least one number shall be selected for each position area in the last two positions. If the position order is the same, the prize money is 150WLC.', '2 Stars in Combination: ', 'Choose two or more different from 0 to 9 number to ten bits, betting, any place. The betting number shall be the same as the drawing number in the current period (no restriction on the position). The single betting amount is 2 yuan. For example, when betting on the number "45", no matter the next two Numbers in the lottery are "45" or "54", they are all winners.', '1 Stars Quick-pick: ', 'The last position area is selected to a minimum of one piece, the position number is the same as the winning bonus of 15WLC.', 'Big/Small/Odd/Even: ', 'Guess constant color "a" and "ten" these two positions "size, odd and double" play, that is, 10 natural number by "big", "small" or "single", "double" nature is divided into two groups, 0-4 for the small, 5-9 for the large, 0, 2, 4, 6, 8 for the double, 1, 3, 5, 7, 9 for the single. The punter may make a specified bet of "size, odd and even" on the digits of "one place and ten place". The number position, nature of the bet and the number position, nature of the same winning. Single note betting amount of 2WLC, single note winning amount of 6WLC.'],
    rule_ulLi3: ['Winning rules', '1. one star is the last place of the lottery number (that is, the single note of 15 yuan;', '2. two star is the lottery number after the two (that is, ten, single note of 150 yuan;', '3. Samsung adopts the last three digits of the lottery number (i.e. the hundreds, tens and ones), and the single note is 1,500 yuan; ', '4. Five stars represents all five (ten thousand, thousand, hundred, ten, and one) winning 10,000 yuan in a single note. No matter how many stars are placed, the amount of each bet is 6 yuan.'],
    rule_ulLi4: ['The lottery', '1. The lottery is held every 10 minutes through the electronic lottery system. ', '2. The winning number is generated by the electronic lottery system. Lottery draw by a, ten, hundred, thousand, ten thousand has produced five Numbers to form the winning number. For example, if the five Numbers produced in turn are: 4,0,1,3,5. Then the number sequence of "53104" is called the winning number.', '3. Release the winning Numbers and lottery results to the betting terminal through the network immediately after the lottery.', 'Please note that the platform will charge 1% of your bonus as operating fees.'],
    others: ['Loading...', 'No more~'],
    toasts: ['In the bet', 'Successful bet', 'Your balance is insufficient', 'Current colourless period', 'Delete successful', 'Successful clearance', 'Minimum Enter ', 'Maximum Enter ', 'The bet has exceeded 200 WLC']
  },
  //摇骰子
  dice: {
    home:['Win a Bonus of ','in','Bet a Bonus of '],
    home_titile:[
      'Accumulative in Bonus Pool',
      'Draw Lottery at Chunk 5 after betting',
      'Lucky number',
      'Win',
      'Congratulations'],
      home_tab:[{
        name:'bet',
        id:'line1'
      },{ 
        name:'Winning Bet',
        id:'line2'
      },{
        name:'My Bet',
        id:'line3'
      }],
      home_tab1:['Odds','Expected Number','Win Rate','Bonus Won','Expected Issues','Bet'],
      home_section:[{
        name:'Less Than',
        id:'1'
      },{
        name:'Equal to',
        id:'2'
      },{
        name:'More Than',
        id:'3'
      }],
      home_tab2:['Time','Player','Bet','Bonus'],
      home_tab3:[
        'Lucky number',
        'Losing Lottery',
        'No Lottery',
        'Issue',
        'Bet Amount',
        'Bet Time',
        'Winning number',
        "You're not betting, go and try your luck"],
        rule:[
          'Game Rules',
          'The players are free to choose a number range, to guess the results of the game. if he guesses correctly, he  will win the corresponding prize. There are 100 possible results, 0-*99. Based on the number range selected by the player, the winning probability and odds will also change accordingly.',
          'If the result is smaller than the selected number, the player wins; eg: the selected number is 50, that is, if the result is larger than 0 and smaller than 50, the players wins, otherwise he fails. ',
          'If the result is equal to the selected number, the player wins. eg: the selected number is 50, that is, if the result is equal to 50, the players wins, otherwise he fails.',
          'If the result is larger than the selected number, the player wins. eg: the selected number is 50, that is, if the result is larger than 50 and smaller than 99, the players wins, otherwise he fails.',
          'Winning number',
          'Our lottery drawing result is made up of the last two digits of the 5th random source after the bet is made successfully. It is a 32-byte random number, which is randomly generated from the public source based on a series of very complex encryption algorithms. All the algorithms are public, and the random source can be verified without being controlled by any party. For example, the bet issue of the player is 31000; and the lottery drawing issue is 31005',
          'Lucky number',
          'Every time the player makes a bet, a lucky number will be generated based on the user information factor to give the player an extra critical strike chance. If the lucky number is the same as the winning number, the odds *10 times will be given to the user from the bonus pool.',
          'Namely, the original odds 1.96 will become 19.6 after the critical strike because of the lucky number.',
          'Bet limit',
          'In order to avoid too large amount in a single bet, resulting in rapid emptiness of the bonus pool and suspension of the game, we set a bet limit on the single round, which is 1% of the total bonus pool.',
        ],
        choose:['More Than','Equal to','Less Than']
  },
  //3d
  threeD: {
    text:'The lottery source using "Chinese Fucai 3D" lottery results',
    tab:[{
      name:' Direct',
      id:1
    },{
      name:'3-Group Single',
      id:2
    },{
      name:'3-Group Compound',
      id:3
    },{
      name:'6-Group',
      id:4
    }],
    bet:['Issue ','Stakes ','in Total'],
    home:['Expected Revenue','Confirm Bets','Selected Bets','Unselect All','Time(s)','th ','number','History','C','D','E','two','one','Pick'],
    record:['Issue','Winning number','Status','Issue','6-Group','3-Group','Leopard'],
    rule:[
      'Game Rules',
      '3D means making a single bet with combinations of three numbers, and the lottery numbers are usually from 000 to 999. The three places from left to right are C, D and E, respectively. The combinations of 1 group of three numbers is called a bet, whose amount is 2wlc. The buyers can repeatedly bet on the lottery numbers they select, and the times range from 2 to 99. The bet amount on one lottery ticket cannot exceed 2000wlc. 1 issue of 3D is sold per day, and the issue is defined by the day when the lottery is drawn, which is arranged based on the calendar year.',
      'Rules',
      '1. Direct Bet: Make a bet on the only pattern of three numbers.',
      '2. Combination-based Bet: Make a bet based on all the combinations of three numbers. If two numbers in one bet are the same, there will be three different combinations, which is called "3 Combinations"; if all the three numbers are different from each other, there will be six different combinations, which is called "6 Combinations".',
      '3. Single-selection Bet: <span class="focus">The bonus for a single bet is fixed at 1500WLC.<span>',
      '4. Combination-based Bet:',
      '3 Combinations Compund',
      'The bonus for a single bet is fixed at 480WLC.',
      '3 Combinations Single',
      '6 Combinations',
      'The bonus for a single bet is fixed at 240WLC.',
      'Lottery Drawing',
      'As for 3D, China Welfare Lottery Center will draw the lottery uniformly, once per day. 3D determines the winning number through the special lottery drawing equipment. In each issue, a 3-digit number is drawn from 000 to 999 based on the order of C, D and E, and this number will be the winning number of the current issue. After the lottery drawing, the welfare lottery sales organization should announce the winning number to the public.',
      'Winning',
      'Winning or not is determined based on whether the bet number and betting method selected by the buyer are consistent with the winning number of the current issue. '
    ],
    betRecord:[
      'Bet Records',
      ' Direct', 
      '3-Group Single',
      '3-Group Compound',
      '6-Group',
      'To be Drawn',
      'Losing Lottery',
      'Issue',
      'note',
      '',
      'Times',
      'Bet Amount',
      'Bet Time',
      'Winning number',
      'No Record',
      'Go to Bet'
    ]
  },
  //划转相关
  record: {
      hzjl:"Recharge",
      zz:"Transfer",
      ty:"Sports",
      yx:"Game",
      jysj:"Transaction Time",
      jycg:"Successful transaction",
      jysb:"transaction failed",
      tyzh:"Sports Account",
      yxzh:"Game Account",
      qsrhzje:"Enter Transfer Amount",
      qdhz:"Confirm the Transfer",
      hzcg:"Transfer Succeeds",
      tyzhzdyxzh:"Sports Account to Game Account",
      qd:"Yes",
      yxzhzdtyzh:"Game Account to Sports Account",
      hzsqysl:"Transfer Application Received",
      yjdzsj:"Expected to go into account within 3 hours. Please payattention to Your account balance.",
      hzsb:"Transfer Fails",
      tipa:"The amount entered cannot be empty or 0",
      tipb:"Your sports account balance is insufficient",
      tipc:"Your game account balance is insufficient"
  }
}