

function calculaDataSemana(year, month, day) {
    var date = new Date(year, month, day);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return NaN; // Invalid date
    }

    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    var weekNumber = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
}

function calculaDataSemestre(year, month, day) {
    var date = new Date(year, month, day);

    if (isNaN(date.getTime())) {
        return NaN;
    }

    var semesterStart;
    if (date.getMonth() < 6) {
        semesterStart = new Date(year, 0, 1);
    } else {
        semesterStart = new Date(year, 8, 1);
    }

    var weekNumber =
        Math.ceil((date - semesterStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
    return weekNumber;
} 

describe("app tests", () => {
    test('checks data da semana em 01/01/2024', () => {
        expect(calculaDataSemana(2024, 0, 1)).toBe(1);
    });

    test('checks data da semana do semestre em 01/01/2024', () => {
        expect(calculaDataSemestre(2024, 0, 1)).toBe(1);
    });
});