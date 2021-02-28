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
    console.log(event);
    $(event.target).css("width", "100%");
    $(event.target).css("inset", "auto");

    var trimmedStr = $.trim(event.target.innerText);
    var text = trimmedStr.substr(trimmedStr.indexOf(' ')+1);
    var firstText = trimmedStr.split(" ")[0];

    if(firstText !== "pseudo"){
        firstText = "explicit";
        text = trimmedStr;
    }

    var min = $($(event.target).find("input")[0]).val();
    var max = $($(event.target).find("input")[1]).val();

    $(event.toElement).closest(".filter-group.expanded").find(".multiselect__option span:contains('"+ text + "')").each(function(index, element)
    {
        if($(element)[0].innerText === text && $(element).parent().find("i")[0].innerText === firstText)
        {
            $.when($(element).trigger("click")).then(function(){
                setTimeout(
                    function() 
                    {
                        $(event.target).find("button.btn.remove-btn").trigger("click")     
        
                        var newAddedFilter = $(event.toElement).closest(".filter-group-body").find("div.filter.full-span").last();
                        $(newAddedFilter.find("input")[0]).val(min);
                        $(newAddedFilter.find("input")[1]).val(max);
                    }, 500);
            });

            return false;
        }
    });
}