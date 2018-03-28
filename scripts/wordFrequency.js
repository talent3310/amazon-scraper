module.exports.calcFrequency = function(text, phaseNum = 1, greater = 2, ignoreArr){ //phase number >= 1
	var grt = greater >= 2 ? greater : 2;
	// var sWords = text.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g).sort();
	var sWords = text.toLowerCase().trim().replace(/[,;.]/g,'').split(/[\s\/]+/g);
	var iWordsCount = sWords.length; // count w/ duplicates

	// array of words to ignore
	var ignoreOrg = ['1','2','3','4','5','6','7','8','9','0','one','two','three','four','five','about','actually','always','even','given','into','just','not','Im','thats','its','arent','weve','ive','didnt','dont','the','of','to','and','a','in','is','it','you','that','he','was','for','on','are','with','as','I','his','they','be','at','one','have','this','from','or','had','by','hot','but','some','what','there','we','can','out','were','all','your','when','up','use','how','said','an','each','she','which','do','their','if','will','way','many','then','them','would','like','so','these','her','see','him','has','more','could','go','come','did','my','no','get','me','say','too','here','must','such','try','us','own','oh','any','youll','youre','also','than','those','though','thing','things'];
	var ignore = ignoreArr && ignoreArr.length ? ignoreArr : ignoreOrg;
	var ignoreFun = function(){
		var obj = {}; // object prop checking > in array checking
		var iCount = ignore.length;
		for (var i=0;i<iCount;i++){
			obj[ignore[i]] = true;
		}
		return obj;
	};

	var counts = {}; // object for math
	// for (var i=0; i<iWordsCount; i++) {
	// 	var sWord = sWords[i];
	// 	if (!ignoreFun()[sWord]) {
	// 		counts[sWord] = counts[sWord] || 0;
	// 		counts[sWord]++;
	// 	}
	// }



	var k = 0; var n = phaseNum - 1;
	while(k + n < iWordsCount) {
		var phase = '';
		for(var j = 0;  j <= n; j++) {
			phase += sWords[k + j] + ' ';
			
		}
		phase = phase.trim();
		if (!ignoreFun()[phase]) {
			counts[phase] = counts[phase] || 0;
			counts[phase]++;
		}
		k++;
	}

	var arr = []; // an array of objects to return
	for (sWord in counts) {
		if(counts[sWord] >= grt) { //frequence >= 2;
			arr.push({
				text: sWord,
				frequency: counts[sWord]
			});
		}
		
	}

	// sort array by descending frequency http://stackoverflow.com/a/8837505
	return arr.sort(function(a,b){
		return (a.frequency > b.frequency) ? -1 : ((a.frequency < b.frequency) ? 1 : 0);
	});

}

var text = "Lorem ipsum dolor sit amet, arcu faucibus vitae, suspendisse maecenas aenean urna lorem ante suspendisse. Sagittis pede quam est dis, lectus imperdiet, tempor erat fusce ac turpis rutrum odio, ut dolor in, faucibus arcu purus eu semper diam. Risus tempus ultrices mattis tellus tempus vel, fringilla amet nec vel vivamus, condimentum justo donec morbi fusce. Porta laoreet ac ipsum. Tristique nisl suspendisse quam ac, aliquet ut ipsum mauris odio, vel sed suspendisse eu nullam. Purus sed eget suscipit vitae, parturient diam ullamcorper, ut ut donec voluptas, elementum aliquam euismod. Velit tortor mollis dapibus hendrerit, tortor nullam tortor id eget lacinia imperdiet. Mauris fermentum arcu cras. Hac sed. At nec massa. Ipsam temporibus nec donec, vehicula molestie ac, fusce quisque enim leo feugiat urna donec, erat malesuada eget mi eros nec adipiscing, pellentesque donec euismod mollis primis vitae in. Luctus lobortis potenti sed enim non ipsum, integer in nibh irure duis nec, donec feugiat tellus nascetur nunc wisi, ac nec in leo in, suspendisse aliquam." + 
"Tellus vel, donec tincidunt amet a integer est, suscipit aliquam vestibulum mi fermentum, mauris eget mauris velit. Justo et lectus, quis gravida gravida, deserunt rutrum tristique, aliquet et mauris litora, accumsan et. Neque ac pede donec phasellus, pede non ac tempor vivamus, in a nec, consequat lacinia lectus, nunc nulla in consectetuer arcu massa dignissim. Phasellus proin, integer enim vestibulum bibendum suscipit eget et, egestas nibh, luctus morbi porta wisi et. Dis arcu, turpis wisi nonummy mauris, nec leo." +
"Placerat leo dolor porta velit tempor, egestas non ac, neque pellentesque tristique, in amet et tincidunt vitae sit sed. Mi id, tortor faucibus turpis mi in mollis. Lorem vivamus, quis urna dictum quis mauris, nisl eros sit, purus varius faucibus pretium sagittis laoreet. Wisi donec. Urna gravida leo leo fusce id, auctor augue ipsum commodo neque, turpis imperdiet velit lacinia tempor urna vivamus, vestibulum fermentum pellentesque potenti, egestas amet a. Scelerisque velit a nulla, non rem eu iaculis vel eros vestibulum. Tempus ultricies, numquam nulla vitae amet tempor quis, egestas justo nibh dignissim aliquam pretium dignissim, a malesuada accumsan morbi elit quam, ultricies minima. Nulla lorem venenatis ligula justo, vel vitae neque, vehicula eros congue, facilisis tempor varius eget aliquet congue nec, urna fermentum vestibulum mi aliquam suspendisse imperdiet. Donec eu risus sapien vel, molestie convallis vivamus augue duis vehicula." +
"Sit ante facilisis duis, eget in pretium, ac commodo tortor pede. Id porta ante, mi sed nostra porttitor morbi nisl nunc, id iaculis maecenas lorem donec neque, et enim, curabitur orci dis quam amet. Curabitur libero diam non libero molestie, orci phasellus risus, tempor amet sagittis. Proin ut, vitae justo amet ut pellentesque tempus, duis et lorem porta suscipit dapibus. Quia consequat, nulla pulvinar in nisl nunc ligula ac, urna semper, velit bibendum nec. Mattis mus vestibulum, erat sodales. Nec est sit justo egestas eu. Dui nulla velit venenatis a sapien, sed adipiscing, dolores vivamus at purus morbi, aut sapien sit porttitor quis odio. Pharetra in arcu amet euismod, eget suspendisse aliquet nunc nibh dictum odio, diam leo interdum ipsum vestibulum erat leo. Amet ac." +
"Aliquet orci pellentesque at nullam ultricies phasellus, ipsum magna est nam non quam eu, integer in. Magna ut quis mauris in mauris luctus, placerat a dictum malesuada ipsum leo nam, sociosqu scelerisque nunc nullam. Nulla habitant arcu a dolor. Voluptates duis, ut vehicula, lorem egestas nulla, nulla lacus nonummy libero convallis eu ut. Imperdiet ac nec, orci enim mollis, torquent ut dolor dolor." +
"Consequatur etiam dui sunt, aliquet nisl est. Cursus neque urna massa, tristique rhoncus tellus volutpat. Ante leo nulla, mattis lacinia laoreet eget lacus felis vestibulum, vehicula placerat amet, vestibulum posuere diam ut. Convallis mauris velit ullamcorper donec integer velit, eget sapien felis vitae fringilla ullamcorper nam, neque tortor sed eget ac. Vitae adipiscing, amet augue mus lacinia fusce quis neque. Nunc egestas sem molestie tincidunt. Vitae lobortis risus adipiscing est. Ultrices nisl sodales, mauris ante enim massa. Ut ornare massa tristique aliquet sed, iaculis morbi vestibulum id, donec ut magna ullamcorper libero lobortis, nibh adipiscing suspendisse. Fusce felis. Adipiscing euismod augue pellentesque lobortis, maxime aliquam sint ut in iaculis. Sodales pellentesque vel eget, pharetra pellentesque lobortis tristique lectus, integer quis ridiculus tristique ut felis felis, mauris wisi purus vehicula in cursus sed, ante nullam habitant lorem porttitor." +
"In maecenas. Integer quis amet, lectus elit a, condimentum ante enim. Venenatis fringilla, aenean suspendisse vivamus urna. Sapien leo lectus. Sapien sed accumsan nobis, tristique in. Cras sed lacus massa risus suspendisse aenean. Et augue tortor odio ut ac dapibus, tempor amet dui molestie metus. Sapien vivamus, donec pellentesque at, porta gravida consequuntur saepe, pellentesque consequatur amet nisl quis morbi netus, lorem pellentesque auctor id. Ut felis. Pede arcu consectetuer. Rhoncus amet commodo imperdiet pharetra, odio neque dui condimentum." +
"Tellus nec elit tristique eros. Maecenas metus id nostra, cras lectus amet congue venenatis, pellentesque odio id dui tristique. Turpis tempor leo arcu, in nec, diam sed laoreet consectetuer nec, dignissim enim dolor, dolor tellus aliquam amet urna condimentum vitae. Aliquet suspendisse class gravida at id. Nisl est laoreet a, ipsum commodo nunc, aptent suspendisse, amet consectetuer lectus vel aenean tempor felis, cum donec per urna integer hendrerit tempus. Tellus ac magna ut, mollis elit quis donec quis, ac ut eget pede pellentesque curabitur amet. Placerat tortor sagittis porro rutrum, mauris vel ac odio, eget dui porttitor, nisl tristique eget amet in dolor lobortis, elit fusce tempor ligula semper est vestibulum. Adipiscing nonummy, amet augue morbi vel. Non posuere saepe nec etiam quis." +
"Elit elit lobortis mauris metus laoreet, ipsum commodo adipiscing, nec sed non. Rhoncus rhoncus magna nec, est nunc neque tempus. Fermentum tincidunt eget etiam non, massa neque feugiat phasellus cillum, massa neque. Dapibus eu wisi quis, maecenas dolor libero sed vel id at, in magna molestie. Cursus ullamcorper. Maecenas id pede cras ante maecenas, quam etiam." +
"Ac lacus nec, eros scelerisque turpis vel lacinia vulputate, dui arcu sed morbi libero felis, curabitur non aenean pellentesque, erat lectus pellentesque sed laoreet vulputate. Facilisi nibh semper nunc tempor, explicabo magna pede luctus nec conubia. Sollicitudin consequatur in mi. Amet eleifend ultrices augue fermentum aliquet consequat. At luctus. A sed sociosqu, diam morbi et morbi, condimentum felis eu at a in ultricies. Erat dolor aliquam sem interdum, sed dui, litora a sollicitudin velit ullamcorper massa nulla." +
"Nec turpis, vel rutrum a tincidunt gravida, nulla et vitae id commodo et lacinia, eu sit, tortor illo nisl eros. Ante doloremque, lacus adipiscing tristique nibh mattis cursus vel. Sapien massa in massa dui etiam, duis dolor cum ligula, donec eleifend aliquam, lorem tempor enim. Etiam ligula nunc a ac neque, vestibulum hendrerit netus, aliquam libero in sollicitudin vestibulum, elit nulla lectus diam quis fusce. Vitae eu at ligula elementum ut." +
"Duis ante. Elit nisl fusce malesuada vulputate lobortis et, velit sit ut aute ipsum at nulla, vitae rhoncus mi nulla dolor amet, dapibus vestibulum nunc in, quis morbi aliquet etiam vel. Id tincidunt venenatis orci elit odio, doloribus ipsum, duis nullam, vestibulum vestibulum cras orci, suspendisse vestibulum. Sit ac arcu aliquet consectetuer sapien. Rhoncus orci. Vel ac, duis iaculis consequat nunc leo tortor urna, eu ligula vestibulum sed dolor sem augue. Sed tempus duis non sed consectetuer metus, metus vitae quis. Laoreet morbi venenatis in maecenas nibh. Imperdiet amet, mattis vestibulum tellus. Praesent at eros risus vulputate suspendisse ante, vitae donec, lorem urna egestas cum erat impedit arcu, nunc volutpat justo nonummy et pellentesque gravida, porttitor curabitur." +
"Aliquam dui pretium. Et platea, ut eu ut cras. Ornare wisi mauris nam, risus tellus pulvinar quis est id nam, at molestie, cras nec justo porttitor feugiat fringilla. Egestas molestiae amet dictum amet augue dignissim, vitae luctus nibh a, urna vel, ut massa ut tristique sed sed penatibus, porttitor amet. In mauris dui lacinia et, nibh nulla fermentum nulla est vel quam. Sit amet sit ac amet, vel mauris sed, tortor ut sed. Mauris consequat vestibulum massa nec venenatis. Ut iure mauris dictum nec ut, tellus lacus vitae, vestibulum scelerisque, accumsan ac sit justo pede. Vestibulum mattis odio fusce at eget consequat, fames morbi accumsan odio, amet accumsan sapien cras. Id nunc wisi a pariatur suscipit dignissim, tempor maecenas, aenean non laoreet pellentesque. Tincidunt in ut sem morbi, semper potenti ut leo fusce diam nec, justo fusce, tellus nulla, nunc non ut nec nunc luctus quis. Dui vel velit, orci bibendum lobortis aliquam." +
"Libero arcu urna pellentesque aliquam massa diam. Bibendum pellentesque, pede proin id, donec adipiscing lacinia. Sollicitudin maecenas. Et congue taciti congue mauris consequat non. Platea magna wisi tellus iaculis consectetuer, quam metus donec, ligula elementum lorem, consequat morbi vestibulum turpis velit gravida consequat, magna rerum odio. Lectus primis vulputate velit vel, odio sed arcu lobortis quis id lectus, lacus aliquam libero lorem, ac dictum cras lectus vestibulum, aliquip egestas rutrum mattis." +
"Elementum nulla. Est est cras urna diam magna. Etiam scelerisque mi dolor, lectus duis faucibus erat pellentesque duis magna. Morbi amet urna sapiente, libero volutpat enim, fusce nec. Nisl quis pharetra, volutpat purus duis duis, sagittis mi mauris sit risus egestas amet. Lectus sed in dolor, posuere et eros eveniet pellentesque massa vitae, urna dui cras morbi adipiscing, commodo curabitur, quisque sapien nec imperdiet. Lectus magna at, eget ad tellus et, mauris mollis adipiscing. Ligula tincidunt purus dui et sollicitudin, habitasse purus, non vestibulum in risus sapien consectetuer, eos at. Sed volutpat ornare morbi, vestibulum gravida lectus fermentum risus et rutrum, aliquam quam feugiat. Praesent lobortis nullam adipiscing, quam augue vivamus, eleifend etiam. Nibh dui nec viverra aenean quam, a vitae tortor tincidunt eget lacus neque, phasellus per curabitur, at id odio et, risus nulla mattis nulla congue ligula. Quis donec sit id phasellus accumsan malesuada, viverra wisi quis, bibendum cursus commodi, ut dictum etiam venenatis aliquam non nulla, ac vulputate ante facilisis ad at in." +
"Per amet, elementum lectus ligula, sit est enim purus. Maecenas in feugiat mauris. Erat neque pellentesque mi nunc vel ipsum, in nisl tempus, et amet dolores proin magna, ac odio. Nec praesent erat vitae ut, nibh ac dictum condimentum ac massa, in luctus morbi, scelerisque quam tristique ultrices ut, nostra eget vehicula libero et. Nec nec, turpis phasellus in in sociosqu amet odio, ac libero sem nibh. Accumsan neque eleifend sit aliquet volutpat turpis, vitae sit, imperdiet non, sociis dui enim purus maecenas ut amet, nisl varius lacinia nunc tellus. Vestibulum erat etiam quis, ligula dolor amet neque conubia malesuada varius, arcu orci a, velit suscipit ante, lectus pede lorem quis sodales turpis ut." +
"Mauris fusce aspernatur, luctus mauris turpis aptent, vel tempor mollis nulla magna magnis nulla, pretium nec odio neque velit elit. Rhoncus sed ultrices molestie sodales accumsan risus, magnis neque tristique libero in ut integer, a auctor vel, pulvinar eleifend ut. Ipsum amet phasellus magna venenatis pellentesque ipsum, quisque lacinia quam ut in. Quam vestibulum aliquam turpis pede ipsum. Condimentum tortor mi, mi turpis mattis ligula enim, nibh leo felis velit pharetra, tempus enim tortor veritatis amet mauris vestibulum, congue conubia vitae vitae vel. Eu odio nulla odio ligula odio orci, vel ea magna sem enim, velit mattis pharetra. Duis ante enim, elit nullam consectetuer litora ac magnis, vestibulum arcu vestibulum nonummy elit pellentesque wisi, egestas mattis torquent praesent, sed nulla venenatis tortor. Tellus hac, amet sit, ridiculus auctor earum. Arcu praesent nunc sociis rutrum, a tempor, scelerisque at nihil dignissim vestibulum, diam nulla, et viverra fringilla sollicitudin. Ultrices mattis, imperdiet faucibus nibh in vitae et, elit vestibulum ligula sed sed, elementum et dignissim quis quis. Accusamus venenatis in mus dolor cras, rhoncus et, malesuada vehicula rutrum quo justo, autem vitae purus nam neque ligula ultricies, tempor massa scelerisque consectetuer ullamcorper. Natoque semper, rhoncus adipiscing non laoreet mattis purus porttitor." +
"Sit quam enim id curae massa tellus, tincidunt et ipsum, leo adipiscing id dictum curabitur praesent ut. Pellentesque erat lectus mauris odio, diam et augue, massa venenatis dolor pretium dapibus, sed dolor, vel mauris. Quis semper suspendisse, wisi amet. Nulla nobis dictum orci fringilla, ante arcu. Aliquam et est ut non nunc arcu, eleifend in placerat vel dui ligula diam, porttitor quis et lorem blandit. At per magna mi, elementum a. Ligula mauris mauris vitae quisque, quis amet, justo pellentesque diam dictumst donec dolor, wisi ante tellus morbi. Quis aliquam lorem tellus." +
"Aliquam tristique rhoncus nascetur commodo, amet quis quis ligula dui, ornare luctus mauris condimentum massa magna venenatis, nulla ipsum varius malesuada vel urna massa, sed diam maecenas amet vestibulum ac. Integer justo, quis magna diam luctus, ut posuere fusce nulla et, sit sed quam duis vitae dolor. Vehicula vel dolor morbi mattis id posuere, risus nihil phasellus velit potenti, integer donec tellus. Est commodo vitae cum. Lacus euismod ut ac diam nulla curabitur." +
"Cras vivamus. Eu id venenatis orci justo et varius, integer ut non phasellus vitae. Maecenas a, varius aliquam leo sodales placerat magna, amet aut pede quisque quam. Nulla ac duis, sed vitae congue in quis volutpat. Cursus ante velit qui dui potenti aenean, tenetur risus tempor aliquam, velit sed, in inceptos. Habitasse vitae proin non. Eu mauris amet, faucibus et. Tristique ante feugiat felis praesent, aliquam est sed id interdum, sit cras maecenas. Lorem a libero laoreet, et morbi id volutpat diam tristique, condimentum sed sollicitudin vehicula, vulputate quisque sem.";

// var res = calcFrequency(text, 2, 3);
// console.log("res===> ", res);

// var iWordsCount = res.length; // count w/o duplicates
// for (var i=0; i<iWordsCount; i++) {
// 	var word = res[i];
// 	console.log(word.frequency, word.text);
// }
