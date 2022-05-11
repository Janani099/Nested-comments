class comments {
  constructor(id, name, handle, content, parentId) {
    this.id = id;
    this.name = name;
    this.handle = handle;
    this.content = content;
    this.childrenIds = [];
    this.parentId = parentId;
  }
}

const addButton = document.getElementById("add-comment");
const parentUl = document.querySelector("#commentsList");
const replyBtns = document.querySelectorAll("#reply");

let rootCommentList = [];

addButton.addEventListener("click", (event) => {
  console.log("parent-name", event.target.className);
  if (event.target.className == "add-btn") {
    let name = document.getElementById("name").value;
    let handle = document.getElementById("handle").value;
    let content = document.getElementById("comment").value;

    if (name.trim() !== "" || handle.trim() !== "" || content.trim() !== "") {
      addComment(name, handle, content, null, parentUl, null);
      document.getElementById("name").value = "";
      document.getElementById("handle").value = "";
      document.getElementById("comment").value = "";
    }
  }
});

let addComment = (name, handle, content, parentId, parentComp, refNode) => {
  let id = ID();
  let comment = new comments(id, name, handle, content, parentId);
  rootCommentList.push(comment);
  let elem = document.createElement("li");
  elem.classList = "elemclass";
  elem.innerHTML = `<p class='commentContent'> ${content} </p>  <p class='commentName'> - ${name}</p>  <button id='reply' class='reply-${id}'>Reply</button> `;
  if (parentId == null) {
    parentComp.append(elem);
  } else {
    parentComp.insertBefore(elem, refNode);
  }
};

parentUl.addEventListener("click", (event) => {
  let levelid = event.target.className.split("-")[0];
  let identity = event.target.className.split("-")[1];
  if (levelid == "reply") {
    let parentElem = parentUl.querySelector("." + event.target.className)
      .parentElement;
    let elem = document.createElement("ul");
    elem.innerHTML = `
	<li class="replyform-${identity}">
	<div class="comment-input-row">
	<div>
		<input type="text" placeholder="Name" id="name-${identity}" class="name-handle" />
	</div>
	</div>
	<div>
	<textarea rows="5" id="content-${identity}" class="comment-box" placeholder="Your reply...."></textarea>
	<div>
		<button class="addreply-${identity}" >Submit</button>
	</div>
	</div>
	</li>`;

    let childListElem = parentElem.querySelector(".replyform-" + identity);

    if (childListElem == null) {
      parentElem.append(elem);
    }
  } else if (levelid == "addreply") {
    let parentElem = parentUl.querySelector("." + event.target.className)
      .parentElement.parentElement.parentElement.parentElement;
    console.log("add reply", parentElem);

    let name = document.getElementById("name-" + identity).value;
    let content = document.getElementById("content-" + identity).value;

    let referenceNode = parentElem.querySelector(".replyform-" + identity);

    if (name.trim() !== "" || content.trim() !== "") {
      addComment(name, handle, content, identity, parentElem, referenceNode);
      document.getElementById("name-" + identity).value = "";
      document.getElementById("content-" + identity).value = "";
    }
  }
});

let ID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};
