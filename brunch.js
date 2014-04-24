/**
 * Created by jiayingyu on 4/19/14.
 */

var del = null;
var address = "";
var cardType = "";
var comments = "";
var totalPrice = 0;
var receipt = "";

function Dish(name, price, qty) {
    this.name = name;
    this.price = price;
    this.qty = qty;

    Dish.prototype.subtotal = function() {
        return this.price * this.qty;
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
        $(this).parent().slideToggle();
        var qtyStr = $(this).parent().find(".textbox").val(); //get qty value from inputbox
        var qty = parseInt(qtyStr); //parse the value of the input box into integer
        var dishN = $(this).attr("id") //get the key value for the dish object
        var newQty = dishes[dishN].qty += qty; //add the qty to the object
//        alert(newQty + "\n" + dishes[dishN].subtotal());
        if (!receiptList.contains(dishes[dishN])) {receiptList.add(dishes[dishN]);}
    });

    $("#del").change(function() {
        del = true;
//        alert(del);
    });

    $("#pickup").change(function() {
        del = false;
//        alert(del);
    });

    $("#visa").change(function() {
        cardType = "Visa";
//        alert(cardType);
    });

    $("#master").change(function() {
        cardType = "Master";
//        alert(cardType);
    });

    $("#amex").change(function() {
        cardType = "Amex";
//        alert(cardType);

    });

    $("#total").click(function() {
        submitForm();
        total();
    });

    $("#checkout").click(function() {
        submitForm();
        calReceipt();
        $("#totalOutput").text(receipt);
    });

    $("#restart").click(function() {
        $("#delForm")[0].reset();
        $(".dish").find(".textbox").val("");
        for (var key in dishes) {
            dishes[key].qty = 0;
        }
    });
});

//save the address and comment
function submitForm() {
    address = $("#addStr").val() + "\n" + $("#addCity").val() + ", NJ\n" + $("#addZip").val();
//    alert(address);
    comments = $("#comments").val();
//    alert(comments);

    //validate cumstomer information
    if (del == null){alert("Please select a deliver type.");}
    else if (del == true && address == "") {alert("Please fill in your address.");}
    if (cardType == "") {alert("Please select a card type");}
}

function total() {
    if (del == true) {totalPrice = 5;}
    else {totalPrice = 0;}
    for (var key in dishes) {
        totalPrice += dishes[key].subtotal();
    }
    alert("total() function called. Total amount is " + totalPrice);
}



function calReceipt() {
    if (del == true) {totalPrice = 5;}
    else {totalPrice = 0;}

    for (var key in dishes) {
        totalPrice += dishes[key].subtotal();
        if (dishes[key].qty != 0) {
            receipt += dishes[key].name + "\n" + dishes[key].price + " * " + dishes[key].qty + " = " + dishes[key].subtotal() + "\n";
        }
    }

    alert("calReceipt() called.\n" + receipt);
}







