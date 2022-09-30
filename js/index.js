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
  type_selected = types[e.target.value];
});

$("#add").on("click", function (e) {
  remove_all_toast();

  good_serial_number = [];
  bad_serial_number = [];

  serial_number.map((elem) => {
    if (match_mask_sn(type_selected.mask_ns, elem) != null) {
      good_serial_number.push(elem);
    } else {
      bad_serial_number.push(elem);
    }
  });

  show_bad_number(bad_serial_number);
  if (good_serial_number.length != 0) {
    $.ajax({
      method: "POST",
      url: "core/add.php",
      data: {
        type: type_selected.id,
        serial_number: good_serial_number,
      },
      success: function (data) {
        var json = JSON.parse(data);
        show_good_number_add(json.good);
        show_good_number_not_add(json.error);
      },
      error: function (e) {},
    });
  }
});

function show_good_number_add(serial_number) {
  show_toast("Добавлено: " + serial_number.join(", "));
}

function show_good_number_not_add(serial_number) {
  show_toast("Дубликаты: " + serial_number.join(", "));
}

function show_bad_number(serial_number) {
  show_toast("Не прошли по паттерну: " + serial_number.join(", "));
}

function remove_all_toast() {
  let div = $("div");
  [...div].forEach((e) => {
    if((e.id).indexOf('toast') > -1){
        $(e).remove()
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
