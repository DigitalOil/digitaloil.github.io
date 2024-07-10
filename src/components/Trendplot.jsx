import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "@/data/data.json"

function calculateAverages(data) {
    var averages = {};
    data.data.forEach(function (entry) {
        var year = entry.year;
        for (var topic in entry) {
            if (topic !== "year") {
                if (!averages[topic]) {
                    averages[topic] = {};
                }
                var sum = entry[topic].reduce(function (acc, curr) {
                    for (var key in curr) {
                        acc += curr[key];
                    }
                    return acc;
                }, 0);
                averages[topic][year] = sum;
            }
        }
    });

    const newData = {};
    for (const topic in averages) {
        if (averages.hasOwnProperty(topic)) {
            newData[topic] = {};
            const topicData = averages[topic];

            for (const year in topicData) {
                if (topicData.hasOwnProperty(year)) {
                    const originalValue = topicData[year];
                    const index = parseInt(year) - 2000;
                    const scaleFactor = data.scaling_factor[index];
                    const scaledValue = originalValue * scaleFactor;
                    newData[topic][year] = scaledValue;
                }
            }
        }
    }

    return newData;
}

const Trendplot = () => {
    const ref = useRef();

    useEffect(() => {
        var totalData = calculateAverages(data);

        const keys = Object.keys(totalData);
        const years = Object.keys(totalData[keys[0]]);

        const margin = { top: 40, right: 200, bottom: 20, left: 40 };
        const width = 900 - margin.left - margin.right;
        const height = 380 - margin.top - margin.bottom;

        const svg = d3
            .select(ref.current)
            .attr(
                "viewBox",
                `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom
                }`
            )
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg
            .append("text")
            .attr("x", width / 2)
            .attr("y", -margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "1em")
            .text("Change in Terms and Conditions Topic Importance Over Time");

        svg
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - height / 2)
            .attr("dy", "1em")
            .style("font-size", "0.8em")
            .style("text-anchor", "middle")
            .text("Topic Proportion");

        const x = d3.scaleBand().domain(years).range([0, width]).padding(0.1);

        const y = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(Object.values(totalData).map((d) => d3.max(Object.values(d)))),
            ])
            .range([height, 0]);

        const color = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10);
        svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g").call(d3.axisLeft(y));

        const tooltipCombined = svg
            .append("g")
            .attr("class", "tooltip")
            .style("opacity", 0);

        tooltipCombined
            .append("rect")
            .attr("width", 180)
            .attr("height", 180)
            .attr("rx", 6)
            .attr("ry", 6)
            .style("fill", "white")
            .style("box-shadow", "1px 2px 4px hsl(220deg 60% 50%)")
            .style("stroke-width", 1)
            .style("pointer-events", "none");

        const tooltipText = tooltipCombined.append("text").attr("x", 5).attr("y", 15);

        const legendWidth = -10;
        const legendHeight = 10;
        const legendPadding = 10;
        const legendSpacing = 5;

        keys.forEach((key, index) => {
            const legend = svg
                .append("g")
                .attr("class", "legend")
                .attr(
                    "transform",
                    `translate(${width - legendWidth - legendPadding},${index * (legendHeight + legendSpacing) + legendPadding
                    })`
                );

            legend
                .append("rect")
                .attr("width", legendHeight)
                .attr("height", legendHeight)
                .attr("fill", color(key));

            legend
                .append("text")
                .attr("x", legendHeight + 5)
                .attr("y", legendHeight / 2)
                .attr("dy", "0.35em")
                .style("font-size", "0.7em")
                .text(key);
        });

        keys.forEach((key) => {
            const line = d3
                .line()
                .x((d, i) => x(years[i]) + x.bandwidth() / 2)
                .y((d) => y(d));

            svg
                .append("text")
                .attr("class", `tooltip-text`)
                .attr("text-anchor", "left")
                .attr("alignment-baseline", "middle");

            const path = svg
                .append("path")
                .datum(Object.values(totalData[key]))
                .attr("fill", "none")
                .attr("stroke", color(key))
                .attr("stroke-width", 2)
                .attr("opacity", 0.7)
                .attr("d", line)

                .on("mouseover", function (event, d) {
                    d3.select(this).transition().duration(200).attr("opacity", 1);

                    svg
                        .selectAll("path")
                        .filter(function (d) {
                            return this !== path.node() && !d3.select(this).classed("domain");
                        })
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.4);

                    tooltipCombined.transition().duration(200).style("opacity", 1);
                    svg.selectAll(".hover-circle").style("opacity", 1);
                })
                .on("mousemove", function (event, d) {
                    let mouseX = d3.pointer(event)[0];

                    let i = Math.round((mouseX - x.bandwidth() / 2) / x.step());

                    let xValue = x.domain()[i];

                    let yValue = d[i];
                    let values = data.data[i][key][0];

                    const totalLines = Object.keys(values).length;
                    const lineHeight = 8;
                    const tooltipHeight = totalLines * lineHeight;

                    const longestLineLength = Math.max(
                        ...Object.entries(values).map(
                            ([key, value]) => `${key}: ${value.toFixed(4)}`.length
                        )
                    );
                    const tooltipWidth = longestLineLength * 10;

                    tooltipCombined
                        .select("rect")
                        .attr("width", tooltipWidth)
                        .attr("height", tooltipHeight);

                    let tooltipX = x(xValue) + x.bandwidth() / 2;
                    let tooltipY = y(yValue);
                    let tooltipXDynamic =
                        x(xValue) + x.bandwidth() / 2 + margin.right > 700
                            ? x(xValue) + x.bandwidth() / 2 - 190
                            : x(xValue) + x.bandwidth() / 2;
                    let tooltipYDynamic =
                        y(yValue) + margin.bottom > 300 ? y(yValue) - 150 : y(yValue);

                    const totalKeys = Object.keys(values).length;

                    let tooltipContent = Object.entries(values)
                        .map(([key, value]) => `${key}: ${value.toFixed(4)}`)
                        .join("\n");

                    tooltipText.selectAll("*").remove();
                    tooltipText
                        .append("tspan")
                        .attr("x", 5)
                        .style("font-size", "0.5em")
                        .style("font-weight", "bold")
                        .text(`${key} - ${xValue}`);

                    tooltipContent.split("\n").forEach((line, index) => {
                        tooltipText
                            .append("tspan")
                            .attr("x", index <= Math.round(totalKeys / 2) ? 5 : 100)
                            .attr(
                                "y",
                                index <= Math.round(totalKeys / 2)
                                    ? 12 * (index + 2)
                                    : 12 * (index - (Math.round(totalKeys / 2) - 1))
                            )
                            .attr("dy", index === 0 ? "1.2em" : "1.2em")
                            .style("font-size", "0.5em")
                            .text(line);
                    });

                    tooltipCombined.attr(
                        "transform",
                        `translate(${tooltipXDynamic},${tooltipYDynamic - 10})`
                    );

                    let circle = svg.selectAll(".hover-circle").data([d]);
                    circle
                        .enter()
                        .append("circle")
                        .attr("class", "hover-circle")
                        .merge(circle)
                        .attr("cx", tooltipX)
                        .attr("cy", tooltipY)
                        .attr("r", 3)
                        .style("fill", color(key));
                })
                .on("mouseout", function () {
                    tooltipCombined.transition().duration(200).style("opacity", 0);

                    svg.selectAll(".hover-circle").remove();

                    svg
                        .selectAll("path")
                        .transition()
                        .duration(200)
                        .attr("opacity", 0.7)
                        .attr("stroke-width", 2);
                });
        });
        tooltipCombined.raise();
    }, []);

    return <svg ref={ref} id="chart" />;
};

export default Trendplot;
