/**
 * Created by jiayingyu on 4/19/14.
 * how to improve:
 * 1. validate customer info in submit()
 * 2. validate customer entry of zip code
 * 3. customer has to fill out all 3 fields of address to be validated
 */

var del = null;
var address = "";
var cardType = "";
var comments = "";

function Dish(name, price, qty) {
    this.name = name;
    this.price = price;
    this.qty = qty;

    Dish.prototype.subtotal = function() {
        var sub = this.price * this.qty;
        return precise_round(sub,2);
    }
}

var s1 = new Dish("Grilled Chicken Caesar Salad", 11.95, 0);
var s2 = new Dish("Grilled Salmon Salad", 12.95, 0);
var s3 = new Dish("Asian Pear Grilled Chick", 11.95, 0);
var p1 = new Dish("Classic Benedict", 11.95, 0);
var p2 = new Dish("Veggie Garden Omelette", 9.95, 0);
var p3 = new Dish("Breakfast Wrap", 8.95, 0);
var p4 = new Dish("Southwest Scramble", 10.45, 0);
var w1 = new Dish("The Original", 8.95, 0);
var w2 = new Dish("Bacon Waffle", 12.45, 0);
var w3 = new Dish("Roy's Chicken and Waffle", 15.75, 0);
var d1 = new Dish("Tropical Mimosa", 5.95, 0);
var d2 = new Dish("Poinsettia", 4.75, 0);
var d3 = new Dish("Texas Floats", 7.95, 0);

var dishes = {"s1":s1,"s2":s2, "s3":s3, "p1":p1, "p2":p2, "p3": p3, "p4":p4, "w1":w1, "w2":w2, "w3":w3, "d1":d1, "d2":d2, "d3":d3};

$(document).ready(function() {
    $(".slide-down").hide();

    $(".dish-name").click(function() {
        $(this).parent().find(".slide-down").slideToggle();
    });

    $(".btn-add").click(function() { //add button clicked
        var dishN = $(this).attr("id") //get the key value for the dish object
        var qtyStr = $(this).parent().find(".textbox").val(); //get qty value from inputbox
        var qty = Number(qtyStr); //parse the value of the input box into number

        if (qty <= 0 || qty % 1 != 0) {
            alert("Please enter a positive integer");
        }
        else {
            dishes[dishN].qty += qty; //add the qty to the object
            $(this).parent().slideToggle();
        }
    });

    $("#del").change(function() {
        del = true;
    });

    $("#pickup").change(function() {
        del = false;
    });

    $("#visa").change(function() {
        cardType = "Visa";
//        alert(cardType);
    });

    $("#master").change(function() {
        cardType = "Master Card";
//        alert(cardType);
    });

    $("#amex").change(function() {
        cardType = "Amex";
//        alert(cardType);

    });

    $("#total").click(function() {
        total();
    });

    $("#checkout").click(function() {
        calReceipt();
    });

    $("#restart").click(function() {
        $("#delForm")[0].reset();
        $(".dish").find(".textbox").val(0);
        del = null;
        address = "";
        cardType = "";
        comments = "";
        for (var key in dishes) {
            dishes[key].qty = 0;
        }
    });
});

//save the address and comment
function submitForm() {
    if ($("#addStr").val() == "" && $("#addCity").val() == "" && $("#addZip").val() == "") {
        address = "";
    }
    else {
        address = $("#addStr").val() + ", " + $("#addCity").val() + ", NJ " + $("#addZip").val();
    }

    comments = $("#comments").val();

    //validate customer information use error handling, cast errors here, instead of include the following code in total() and calReceipt() twice
//    if (del == null){alert("Please select a deliver type.");}
//    else if (del == true && address == "") {alert("Please fill in your address.");}
//    if (cardType == "") {alert("Please select a card type");}
}

function total() {
    var totalPrice = 0;
    var checkoutList = "<tr><th>Shopping Cart</th></tr>";
    submitForm();

    //validate customer information
    if (del == null){alert("Please select a deliver type.");}
    else if (del == true && address == "") {alert("Please fill in your address.");}
    else if (cardType == "") {alert("Please select a card type");}
    else {
        for (var key in dishes) {
            if (dishes[key].qty != 0 ) {
                totalPrice += dishes[key].subtotal();

                checkoutList += "<tr><td colspan='3'>" + dishes[key].name + "</td></tr>" +
                                "<tr><td>$" + dishes[key].price +"</td><td>x " + dishes[key].qty +
                                "<td>= $" + dishes[key].subtotal().toFixed(2) + "</td></tr>";
            }
        }

        if (del == true) {
            totalPrice += 5;
            checkoutList += "<tr><td colspan='2'>Delivery Service</td><td>= $5.00</td></tr>"
        }

        checkoutList += "<tr><td colspan='2'>Total</td><td>= $" + totalPrice.toFixed(2) + "</td></tr>";
        $("#checkoutTable").html(checkoutList);
    }
}


function calReceipt() {
    submitForm();

    var totalPrice = 0;
    var receiptList = "<tr><th>Item</th><th>Price</th><th>Qty</th><th>Amount</th></th>";
    var delType;
    var delPrice;

    //validate customer information
    if (del == null){alert("Please select a deliver type.");}
    else if (del == true && address == "") {alert("Please fill in your address.");}
    else if (cardType == "") {alert("Please select a card type");}
    else {
        $("#coverPage").hide();
        for (var key in dishes) {
            if (dishes[key].qty != 0) {
                totalPrice += dishes[key].subtotal();

                receiptList += "<tr><td>" + dishes[key].name + "</td><td class='price'>$" + dishes[key].price + "</td><td>" +
                    dishes[key].qty + "</td><td class='price'>$" + dishes[key].subtotal().toFixed(2) + "</td></tr>";
            }
        }

        if (del == true) {
            totalPrice += 5;
            delType = "Delivery";
            delPrice = 5;
        }
        else {
            delType = "Pick up in store";
            delPrice = 0;
        }

        receiptList += "<tr><td>" + delType + "</td><td colspan='3' class='price'>$" + delPrice.toFixed(2) + "</td></tr>" +
            "<tr><td colspan='3'>Total</td><td class='price'>$" + totalPrice.toFixed(2) + "</td></tr>" +
            "<tr><td>Card Type</td><td colspan='3'>" + cardType + "</td></tr>" +
            "<tr><td>Address</td><td colspan='3'>" + address + "</td></tr>" +
            "<tr><td>Comments</td><td colspan='3'>" + comments + "</td></tr>";

        $("#receiptTable").append(receiptList);
    }
}

function precise_round(num,decimals) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
}







