// CMS library for invoking ajax functions.
// A layer on top of jQuery .ajax that adds some Rails and CMS logic
jQuery(function ($) {
    $.ajaxSetup({
        beforeSend:function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
            xhr.setRequestHeader("Accept", "application/json");
        },
        error:function (x, status, error) {
            alert("A " + x.status + " error occurred: " + error);
        }
    });

    $.cms_ajax = {
        // Sets the message Accepts to javascript.
        // Pass to beforeSend: when calling AJAX.
        asJS:function () {
            return function (xhr) {
                xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
                xhr.setRequestHeader("Accept", "text/javascript");
            }
        },
        // Invoke a Rails aware (w/ CSRF token) PUT request.
        // @param [Hash] message A json message without the type.
        // See http://api.jquery.com/jQuery.ajax/ for acceptable format.
        put:function (message) {
            message['type'] = 'POST';
            message['data'] = message['data'] || {}
            message['data']['_method'] = 'PUT';

            $.ajax(message);

        },
        // Invoke a Rails aware (w/ CSRF token) DELETE request.
        // @param [Hash] message A json message without the type.
        // See http://api.jquery.com/jQuery.ajax/ for acceptable format.
        //      ex.
        //      $.cms_ajax.delete({
        //          url:'/event/1',
        //          success:function (result) {
        //             console.log("Got back " + result);
        //          }
        //      });
        //
        delete:function (message) {
            message['type'] = 'POST';
            message['data'] = message['data'] || {}
            message['data']['_method'] = 'DELETE';
            $.ajax(message);

        }
    };
});