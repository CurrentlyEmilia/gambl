const XorShift = require('xorshift');

const rnd = XorShift;

const symbols = ["7", "BAR", "\u{1F352}", "\u{1F48E}", "1", "2", "3", "4", "5", "6"];
let cash = 100;

document.title = 'estr gambl rewrite';

function eep(ms) {
	return new Promise((a) => setTimeout(a, ms));
}

function randSymb() {
	return symbols[Math.floor(rnd.random() * symbols.length)];
}

function disableElement(id) {
	document.getElementById(id).disabled = true;
}

function enableElement(id) {
	document.getElementById(id).disabled = false;
}

async function setText(id, text) {
	document.getElementById(id).innerText = text;
}

async function spinny(num) {
	let i = 0; // str
	let j = 0; // i

	i = randSymb();

	while (1) {
		await setText(`slot${num}`, randSymb());
		await eep(1);

		j++;

		if (j == 100) {
			break;
		}
	}

	document.getElementById(`slot${num.toString()}`).innerText = i;
	return i;
}

function updateCash() {
	setText('cash', `${cash}$`);

	localStorage.setItem("ICannotTellMyFather", cash.toString());

	if (cash < 10) {
		disableElement('gambl');
		enableElement('commit');
	} else {
		disableElement('commit');
	}
}

// STATE FUCKING MACHINE
function getReward(state) {
	let a = 0;

	if (state[0] == state[1]) {
		a = a + 10;
	}

	if (state[1] == state[2]) {
		a = a + 10;
	}

	if (state[0] == state[1] && state[1] == state[2]) {
		a = 1000;
	}

	return a;
}

if (!localStorage.getItem("ICannotTellMyFather")) {
	localStorage.setItem("ICannotTellMyFather", cash.toString());
}

cash = parseInt(localStorage.getItem("ICannotTellMyFather"));

document.addEventListener('DOMContentLoaded', async () => {
	enableElement('gambl');

	updateCash();

	document.getElementById('gambl').addEventListener('click', async () => {
		let gamblState = ["", "", ""];

		cash = cash - 10;
		updateCash();

		disableElement('gambl');

		const slut = Promise.all([spinny(1), spinny(2), spinny(3)]);
		const whore = await slut;

		gamblState[0] = whore[0];
		gamblState[1] = whore[1];
		gamblState[2] = whore[2];

		cash = cash + getReward(gamblState);

		enableElement('gambl');

		updateCash();
	});

	document.getElementById('commit').addEventListener('click', async () => {
		localStorage.clear();

		location.reload();
	});

	document.getElementById('license').addEventListener('click', async () => {
		alert(atob('Q29weXJpZ2h0IChDKSAyMDI0IEVtaWxpYSBMdW1pbsOpIDxlcWlsaWFAbmF0aW9uYWwuc2hpdHBvc3RpbmcuYWdlbmN5PgoKUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0IG1vZGlmaWNhdGlvbnMsIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDoKCjEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci4KMi4gUmVkaXN0cmlidXRpb25zIG9mIGJpbmFyeSBmb3JtcyBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci4KMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlci9ob2xkZXJzIG5vciB0aGUgbmFtZXMgb2YgaXQncyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLgoKVGhlIHNvdXJjZSBjb2RlIGFuZCBiaW5hcmllcyBhcmUgd29ya3MgaW4gcHJvZ3Jlc3MgYW5kIHRoZSBjb250cmlidXRvcnMgYW5kIGNvcHlyaWdodCBob2xkZXIvaG9sZGVycyBhdHRlbXB0IHRvIGFkZCBuZXcgZmVhdHVyZXMgYW5kIGZpeCBwcm9ibGVtcy4KVGhlIHNvdXJjZSBjb2RlIGFuZCBiaW5hcmllcyBpcyBwcm92aWRlZCBvbiBhbiAiYXMgaXMiIGJhc2lzIGFuZCB3aXRob3V0IHdhcnJhbnRpZXMgb2YgYW55IGtpbmQgY29uY2VybmluZyB0aGUgc291cmNlIGNvZGUgYW5kIGJpbmFyeSBmb3JtcywgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiBtZXJjaGFudGFiaWxpdHksIGZpdG5lc3MgZm9yIGEgcGFydGljdWxhciBwdXJwb3NlLCBhYnNlbmNlIG9mIGRlZmVjdHMgb3IgZXJyb3JzLCBhY2N1cmFjeSBhbmQgbm9uLWluZnJpbmdlbWVudCBvZiBpbnRlbGxlY3R1YWwgcHJvcGVydHkgcmlnaHRzLgoKRXhjZXB0IGluIHRoZSBjYXNlcyBvZiB3aWxsZnVsIG1pc2NvbmR1Y3Qgb3IgZGFtYWdlcyBkaXJlY3RseSBjYXVzZWQgdG8gbmF0dXJhbCBwZXJzb25zLCB0aGUgY29weXJpZ2h0IGhvbGRlci9ob2xkZXJzIHdpbGwgaW4gbm8gZXZlbnQgYmUgbGlhYmxlIGZvciBhbnkgZGlyZWN0IG9yIGluZGlyZWN0LCBtYXRlcmlhbCBkYW1hZ2VzIG9yIG1vcmFsIGRhbWFnZXMsIGFyaXNpbmcgb3V0IG9mIHRoaXMgbGljZW5zZSBvciBvZiB0aGUgdXNlIG9mIHRoZSBzb3VyY2UgY29kZSBvciBiaW5hcnkgZm9ybXMsIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24sIGRhbWFnZXMgZm9yIGxvc3Mgb2YgZ29vZHdpbGwsIHdvcmsgc3RvcHBhZ2UsIGNvbXB1dGVyIGZhaWx1cmUsIG1hbGZ1bmN0aW9uLCBsb3NzIG9mIGRhdGEgb3IgYW55IGNvbW1lcmNpYWwgZGFtYWdlLCBldmVuIGlmIHRoZSBjb3B5cmlnaHQgaG9sZGVyL2hvbGRlcnMgaGFzL2hhdmUgYmVlbiBhZHZpc2VkIG9mIHN1Y2ggZGFtYWdlLgo'));
	});
});
