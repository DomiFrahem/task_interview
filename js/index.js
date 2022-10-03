let types = null;
let type_selected = null;
let serial_number = null;

$(".toast button").on("click", function (e) {
  $(e.target.parentElement.parentElement).hide();
});

$(document).ready(function () {
  $.ajax({
    url: "core/get_types.php",
    success: function (data) {
      types = JSON.parse(data);
      type_selected = types[0];

      types.forEach((element) => {
        $("#type").append(
          $("<option>", {
            value: element.id,
            text: element.name_type,
          })
        );
      });
    },
    error: function (e) {},
  });
});

$("#serial_number").change(function (e) {
  serial_number = e.target.value.split("\n");
});

$("#type").on("click", function (e) {
  type_selected = types[$("#type")[0].selectedIndex];
});

$("#add").on("click", function (e) {
  remove_all_toast();

  $.ajax({
    method: "POST",
    url: "core/add.php",
    data: {
      type: type_selected,
      serial_number: serial_number,
    },
    success: function (data) {
      var json = JSON.parse(data);
      show_no_match(json.no_match);
      show_good_number_add(json.good);
      show_dublicate(json.dublicate);
    },
    error: function (e) {},
  });
});

function show_good_number_add(serial_number) {
  show_toast("Добавлено: " + serial_number.join(", "));
}

function show_dublicate(serial_number) {
  show_toast("Дубликаты: " + serial_number.join(", "));
}

function show_no_match(serial_number) {
  show_toast("Не прошли по паттерну: " + serial_number.join(", "));
}

function remove_all_toast() {
  let div = $("div");
  [...div].forEach((e) => {
    if (e.id.indexOf("toast") > -1) {
      $(e).remove();
    }
  });
}
index_toast = 0;

function show_toast(text) {
  index_toast++;
  let id = "toast" + index_toast;
  var toast = $(".toast")[0];
  let toastclone = $(toast).clone();

  $(toastclone).attr("id", id);
  $(".card").after(function () {
    return toastclone;
  });

  var div = $("#" + id)
    .children()
    .children()[0];
  $(div).html(text);

  var btn = $("#" + id)
    .children()
    .children()[1];
  $(btn).on("click", function () {
    $("#" + id).remove();
  });

  $("#" + id).show();
}
