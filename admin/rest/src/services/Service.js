const base_url = "https://pos-dev.myignite.online/connector/api"

export function GetBrandList() {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNDIwM2Y2MmJmNDFmNzY2ODQyMzM3Y2MwZjFkNjEzZTRhZDdjNjUyODU1OWMwMzIzOGE2Y2M3MjdlOTRkZjU0NTFkYTFiOWQyMjNhMjUyIn0.eyJhdWQiOiIzMiIsImp0aSI6IjcxNDIwM2Y2MmJmNDFmNzY2ODQyMzM3Y2MwZjFkNjEzZTRhZDdjNjUyODU1OWMwMzIzOGE2Y2M3MjdlOTRkZjU0NTFkYTFiOWQyMjNhMjUyIiwiaWF0IjoxNjY5NzkzNDE0LCJuYmYiOjE2Njk3OTM0MTQsImV4cCI6MTcwMTMyOTQxNCwic3ViIjoiMTAwNSIsInNjb3BlcyI6W119.MDEs4MK1ghK-X8VuNygeS2XmlHu73UcxkiUCFrfjR8-VMi3e0zCcHy0B6QldhNuIfGPAeLqlUbAnqAubJycrKFUaOg-eDCnc7TlLtfA__rHYdwuVDTwnOqq8xqulRLPanJ1zylLdd41bN8z_5bYamw3bNrI2bidz8dVcHciwpOXBk5T-wbnDopHQDtaXqqUPk1NvkR45jZQNZS53-Ll1IwEyNFZSiGJxsPdgDySzsffLfHT2L1WaOOZcNbKlQsLqw8ZWaxLq4gFULrHPTuK4_ZutK4qum3dIANLCpGRFNkxl25qf-wbYlkvN1MBlJnIOJUx7swRxZA2drwC1Y6KIQxuK4lot0jcAfiXg7By5aUuJUhTM1h7HM3dYjsPesAbaBlhxwfvvgB9NyxWh_zeDRatH12KSmHMtedncNZBD-GBy88oen5Y66fsAxV16SY-FlD7RMPG5Fm4q3K9yCvTbMtKIa3UbQBAJDXRHOdm9P_yXQpqycVULi5Zx47j0p4fuI7fri5hrzht_fY7IUxRDk4lOgEeXQrqqxFR3yyIR1kX033ICVijUKyQfTsv6f98a_xH61t8I3Y_YRS4RkbLqvgBKd04ncPETp4M4C0Y1DgBbhzdJDuDsEaSabE2welLTkBPXokg30-eltwleCiAAwj_i5_CrEF0119rG-ZIeu2I";

    return new Promise((resolve, reject) => {
        fetch(base_url+"/brand", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status == 401) {
                    window.location = "/";
                } else {
                    resolve(response.json());
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
export function AddBrands(values) {
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjcxNDIwM2Y2MmJmNDFmNzY2ODQyMzM3Y2MwZjFkNjEzZTRhZDdjNjUyODU1OWMwMzIzOGE2Y2M3MjdlOTRkZjU0NTFkYTFiOWQyMjNhMjUyIn0.eyJhdWQiOiIzMiIsImp0aSI6IjcxNDIwM2Y2MmJmNDFmNzY2ODQyMzM3Y2MwZjFkNjEzZTRhZDdjNjUyODU1OWMwMzIzOGE2Y2M3MjdlOTRkZjU0NTFkYTFiOWQyMjNhMjUyIiwiaWF0IjoxNjY5NzkzNDE0LCJuYmYiOjE2Njk3OTM0MTQsImV4cCI6MTcwMTMyOTQxNCwic3ViIjoiMTAwNSIsInNjb3BlcyI6W119.MDEs4MK1ghK-X8VuNygeS2XmlHu73UcxkiUCFrfjR8-VMi3e0zCcHy0B6QldhNuIfGPAeLqlUbAnqAubJycrKFUaOg-eDCnc7TlLtfA__rHYdwuVDTwnOqq8xqulRLPanJ1zylLdd41bN8z_5bYamw3bNrI2bidz8dVcHciwpOXBk5T-wbnDopHQDtaXqqUPk1NvkR45jZQNZS53-Ll1IwEyNFZSiGJxsPdgDySzsffLfHT2L1WaOOZcNbKlQsLqw8ZWaxLq4gFULrHPTuK4_ZutK4qum3dIANLCpGRFNkxl25qf-wbYlkvN1MBlJnIOJUx7swRxZA2drwC1Y6KIQxuK4lot0jcAfiXg7By5aUuJUhTM1h7HM3dYjsPesAbaBlhxwfvvgB9NyxWh_zeDRatH12KSmHMtedncNZBD-GBy88oen5Y66fsAxV16SY-FlD7RMPG5Fm4q3K9yCvTbMtKIa3UbQBAJDXRHOdm9P_yXQpqycVULi5Zx47j0p4fuI7fri5hrzht_fY7IUxRDk4lOgEeXQrqqxFR3yyIR1kX033ICVijUKyQfTsv6f98a_xH61t8I3Y_YRS4RkbLqvgBKd04ncPETp4M4C0Y1DgBbhzdJDuDsEaSabE2welLTkBPXokg30-eltwleCiAAwj_i5_CrEF0119rG-ZIeu2I";

    return new Promise((resolve, reject) => {
        fetch(base_url+"/brand", {
            method: "POST",
            body: JSON.stringify({ name: values.name, description: values.des }),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status == 401) {
                    window.location = "/";
                } else {
                    resolve(response.json());
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}