<?php

// Including the SVG library
include 'svg.php';

function main() {
    // Receive the values for the graph into variables: a, b, c, d
    echo "Enter 4 values: \n";
    $a = readline();
    $b = readline();
    $c = readline();
    $d = readline();

    // Typecasting the inputs into integers and making an array
    $inputs = array((int)$a, (int)$b, (int)$c, (int)$d);

    // Calculate the max number from the array and adding an extra 100 to separate the bar graph from the top of the>
    $max_number = max($inputs) + 100;

    // Calculate the proportionality of each bar graph
    $aC = 500 * ($a / $max_number);
    $bC = 500 * ($b / $max_number);
    $cC = 500 * ($c / $max_number);
    $dC = 500 * ($d / $max_number);

    // Calling the draw all shapes function
    draw_all_shapes($aC, $bC, $cC, $dC);
}

// Define the draw all shapes function
function draw_all_shapes($bar1, $bar2, $bar3, $bar4) {
    // Using a class called SVG from the library
    $s = new SVG();

    // Create the SVG and define the size
    $s->create(500, 500);

    // Background color
    $s->background('#FFFFFF');

    // The horizontal and vertical lines
    $s->line(6, 6, 0, 6, 500, '#000000');
    $s->line(6, 6, 500, 500, 500, '#000000');

    // Drawing the Bar Graphs
    $s->rectangle(50, 500, 20, (500 - $bar1), '#000000', '#FFFFFF', 4, 4, 4);
    $s->rectangle(50, 500, 120, (500 - $bar2), '#000000', '#FFFFFF', 4, 4, 4);
    $s->rectangle(50, 500, 220, (500 - $bar3), '#000000', '#FFFFFF', 4, 4, 4);
    $s->rectangle(50, 500, 320, (500 - $bar4), '#000000', '#FFFFFF', 4, 4, 4);

    // Closing the SVG
    $s->finalize();
    try {
        // Save the SVG file
        $s->save("barras.svg");
    } catch (Exception $e) {
        // Handle any IO errors
        echo $e->getMessage();
    }

    echo $s;
}

main();

?>
