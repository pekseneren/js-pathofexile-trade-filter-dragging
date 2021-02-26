$('div.filter-group-body').on('DOMNodeInserted', 'div.filter.full-span', function () {
    $(this).draggable({
        iframeFix: true,
        zIndex: -1,
        stop: function(event, ui){ onDragStop(event, ui); }
    });
});

$("div.filter.full-span").draggable({
    iframeFix: true,
    zIndex: -1,
    stop: function(event, ui){ onDragStop(event, ui); }
});

function onDragStop(event, ui){
    $(event.target).css("width", "100%");
    $(event.target).css("inset", "auto");

    var trimmedStr = $.trim(event.target.innerText);
    var text = trimmedStr.substr(trimmedStr.indexOf(' ')+1);
    var firstText = trimmedStr.split(" ")[0];
    var min = $($(event.target).find(":input.minmax")[0]).val();
    var max = $($(event.target).find(":input.minmax")[1]).val();

    $(event.toElement).closest(".filter-group.expanded").find(".multiselect__option span:contains('"+ text + "')").each(function(index, element)
    {
        if($(element)[0].innerText === text && $(element).parent().find("i")[0].innerText === firstText)
        {
            $(element).trigger("click");
        }
    });

    $(event.target).find("button.btn.remove-btn").trigger("click");
}