const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">



    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" placeholder= 'Page Title' type="text" class="form-control"/>
        <input id ="author" name="author" placeholder= 'Author' type="text" class="form-control"/>
        <input id ="email" name="email" placeholder= 'email' type="text" class="form-control"/>
        <textarea id ="content" name="content" placeholder= 'Content' class="form-control"></textarea>
        <input id ="status" name="status" placeholder= 'Status' type="text" class="form-control"/>
      </div>
    </div>


    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>

  </form>
`);
