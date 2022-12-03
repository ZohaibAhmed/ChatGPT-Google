chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		var q = document.getElementsByName("q")[0].value;
		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log(q);
		let encoded = encodeURI(q);

		var html = "<div id='GPTCHAT' style='background:#fff;position:relative;-webkit-box-sizing:border-box;padding:50px;border-radius:10px;border: 1px solid #35d332;margin-top: 30px;margin-bottom: 30px;color: #205540;margin-left: var(--center-abs-margin); width: 800px;'>Generating ChatGPT Response</div>";
		document.getElementById("appbar").insertAdjacentHTML('afterend', html);

		// ----------------------------------------------------------
		fetch('http://localhost:5001/chat?q=' + encoded)
			.then((response) => response.text())
			.then((data) => {
				// insert data into page with tags are rendered as HTML
				var d = "";
				// remove all instances of Copy code from data
				data = data.replace(/Copy code/g, "");

				var d_split = data.split("\n");
				for (var i = 0; i < d_split.length; i++) {
					d += "<p><code>" + d_split[i] + "</code></p>";
				}
				document.getElementById("GPTCHAT").innerHTML = d;
			});
	}
	}, 10);
});