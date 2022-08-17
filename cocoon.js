//  Part 1: Write a simple text editor that supports add, delete, and edit with undo functionality.
// class Editor:
//     def __init__(self) -> None:
//         pass

//     def add(self, s: str) -> None:
//         """
//         Appends s to current text.
//         Examples:
//             - Current text is 'foo'. if add('bar') is called, then dump() should return 'foobar'
//         """
//         pass

//     def edit(self, s: str) -> None:
//         """
//         Edits the last 's' that was added and replaces it with the given 's'.
//         Examples:
//             - add('foo') and add('bars') -> 'foobars'. if edit('xyz') is called,
//             then dump() should return 'fooxyz' ('bars' with 'xyz'). If edit('abcd') is called,
//             then dump() would now return 'fooabcd'
//         """
//         pass

//     def delete(self) -> None:
//         """
//         Deletes the last 's' that was added or edited.
//         Examples:
//             - Current text is 'foobar' after add('foo') and add('bar'). if delete() is called,
//             then dump() should return 'foo'
//         """
//         pass

//     def undo(self) -> None:
//         """
//         undoes the last action.
//         For example, if the last action was a deletion, then it will remove the deletion.
//         If the last action was an edit, then it restores the previous state for the last added string.
//         If the last action as an add, then it removes the last string added.
//         Examples:
//             - Current text is 'foobar' after add('foo') and add('bar'). if undo() is called,
//             then dump() should return 'foo'
//             - Current text is 'bar' after add('foo') and edit('bar'). if undo() is called,
//             then dump() should return 'foo'
//             - Current text is 'foo' after add('foo'), add('bar'), delete(). if undo() is called,
//             then dump() should return 'foobar'
//         """
//         pass

//     def dump(self) -> str:
//         """
//         dump renders the full text based on the previous actions.
//         """
//         pass

class Editor {
  constructor() {
    this.text = "";
    this.recentTexts = [];
    this.removedText = [];
    this.actions = [];
  }

  add(s) {
    this.text = this.text.concat(s);
    this.recentTexts.push(s);
    this.actions.push("add");
  }

  edit(s) {
    const textArr = this.text.split("");
    console.log(`textArr`, textArr);
    textArr.splice(
      textArr.length - this.recentTexts[this.recentTexts.length - 1].length,
      textArr.length,
      s
    );

    this.text = textArr.join("");
    const removed = this.recentTexts.pop();
    this.recentTexts.push(s);
    this.removedText.push(removed);
    this.actions.push("edit");
  }

  delete() {
    if (this.text === "") {
      return;
    }
    const textArr = this.text.split("");
    textArr.splice(
      textArr.length - this.recentTexts[this.recentTexts.length - 1].length,
      textArr.length
    );

    this.text = textArr.join("");
    const removed = this.recentTexts.pop();
    this.removedText.push(removed);
    this.actions.push("delete");
  }

  undo() {
    if (this.actions[this.actions.length - 1] === "add") {
      this.delete();
    }
    if (this.actions[this.actions.length - 1] === "edit") {
      const recentRemoved = this.removedText.pop();
      this.edit(recentRemoved);
      const removed = this.recentTexts.pop();
      this.removedText.push(removed);
    }
    if (this.actions[this.actions.length - 1] === "delete") {
      const recentRemoved = this.removedText.pop();
      this.add(recentRemoved);
    }
  }

  dump() {
    return this.text;
  }
}

const ed = new Editor();
ed.add("foo");
ed.add("bar");
ed.edit("xyz");
ed.edit("abcd");
ed.delete();
ed.delete();
ed.undo();
ed.dump();

console.log(`ed`, ed);
