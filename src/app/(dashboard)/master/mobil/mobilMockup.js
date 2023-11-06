import { getCustomerById } from "../customers/customerMockup" 

export const getAllMobil = async () => {
  return mobil
}

export const getAllMobilWithCustomer = async () => {
  return await Promise.all(mobil.map(async (mobil) => {
    const customer = await getCustomerById(mobil.id_customer)
    return {
      ...mobil,
      nama_customer: customer?.nama,
    }
  }))
}

export const getMobilById = async (id) => {
  return mobil.find((mobil) => mobil.id_mobil === id)
}

export const getMobilByCustomer = async (id) => {
  return mobil.filter((mobil) => mobil.id_customer === id)
}

export const deleteMobil = async (id) => {
  mobil.splice(mobil.findIndex((mobil) => mobil.id_mobil === id), 1)
}

export const addMobil = async (data) => {
  mobil.push(data)
}

export const updateMobil = (id, data) => {
  const index = mobil.findIndex((mobil) => mobil.id_mobil === id)
  mobil[index] = data
}

const mobil = [{
  "id_mobil": "2T3BF4DV2BW382776",
  "nopol": "BY 5859 BYZ",
  "model": "Civic",
  "id_customer": "abc1234"
}, {
  "id_mobil": "3GYFNDE31CS272392",
  "nopol": "HA 5253 HAA",
  "model": "City",
  "id_customer": "901klm6"
}, {
  "id_mobil": "5UXFG4C5XAL409352",
  "nopol": "CP 7071 CPO",
  "model": "Odyssey",
  "id_customer": "012bcd3"
}, {
  "id_mobil": "WAUEF78E08A062689",
  "nopol": "HV 6667 HVW",
  "model": "BR-V",
  "id_customer": "678uvwx"
}, {
  "id_mobil": "JTHKD5BH5C2931291",
  "nopol": "EG 0203 EGH",
  "model": "Accord",
  "id_customer": "890hij5"
}, {
  "id_mobil": "1ZVBP8AM2E5468162",
  "nopol": "J 1213 JKL",
  "model": "CR-V",
  "id_customer": "890nop7"
}, {
  "id_mobil": "SCBLC37F95C986444",
  "nopol": "AS 3637 AST",
  "model": "Mobilio",
  "id_customer": "234klm6"
}, {
  "id_mobil": "3C63D3GLXCG428345",
  "nopol": "CA 6061 CAA",
  "model": "Odyssey",
  "id_customer": "678klm6"
}, {
  "id_mobil": "JH4DC23921S941405",
  "nopol": "HG 5657 HGH",
  "model": "WR-V",
  "id_customer": "stu6789"
}, {
  "id_mobil": "SCBLE47K18C137040",
  "nopol": "FA 1617 FAA",
  "model": "BR-V",
  "id_customer": "123z12a"
}, {
  "id_mobil": "WBAWR3C59AP069770",
  "nopol": "B 1234 ABC",
  "model": "CR-V",
  "id_customer": "789ijkl"
}, {
  "id_mobil": "3D73M3CL7BG530964",
  "nopol": "DD 8283 DDE",
  "model": "BR-V",
  "id_customer": "890nop7"
}, {
  "id_mobil": "SCBDR3ZA8AC663307",
  "nopol": "GJ 4041 GJK",
  "model": "BR-V",
  "id_customer": "678efg4"
}, {
  "id_mobil": "WA1YD64B65N387907",
  "nopol": "S 1819 STU",
  "model": "CR-V",
  "id_customer": "012mnop"
}, {
  "id_mobil": "WBS3C9C59FJ158462",
  "nopol": "BA 4243 BAB",
  "model": "Mobilio",
  "id_customer": "234tuv9"
}, {
  "id_mobil": "WBABW33495P423923",
  "nopol": "GM 4243 GMN",
  "model": "BR-V",
  "id_customer": "678bcd3"
}, {
  "id_mobil": "WP0CA2A89CS077873",
  "nopol": "AD 2627 ADE",
  "model": "WR-V",
  "id_customer": "jkl3456"
}, {
  "id_mobil": "1FAHP3GN7AW273748",
  "nopol": "FA 1617 FAA",
  "model": "Brio",
  "id_customer": "345z12a"
}, {
  "id_mobil": "WAUWGBFC8EN114225",
  "nopol": "EJ 0405 EJK",
  "model": "Brio",
  "id_customer": "678nop7"
}, {
  "id_mobil": "JTHBL1EF6B5567904",
  "nopol": "DG 8485 DGH",
  "model": "Jazz",
  "id_customer": "789qrs8"
}, {
  "id_mobil": "WBADT33471G866616",
  "nopol": "CA 6061 CAA",
  "model": "WR-V",
  "id_customer": "012bcd3"
}, {
  "id_mobil": "WBAVB73557P684977",
  "nopol": "ED 0001 EDE",
  "model": "Civic",
  "id_customer": "901bcd3"
}, {
  "id_mobil": "KMHGC4DDXCU984941",
  "nopol": "EP 0809 EPO",
  "model": "HR-V",
  "id_customer": "pqr2345"
}, {
  "id_mobil": "WBAEN33435P266566",
  "nopol": "AM 3233 AMN",
  "model": "HR-V",
  "id_customer": "234hij5"
}, {
  "id_mobil": "WAUFFAFLXCA306487",
  "nopol": "HA 5253 HAA",
  "model": "Mobilio",
  "id_customer": "456tuv9"
}, {
  "id_mobil": "WBABW53406P195842",
  "nopol": "GD 3637 GDE",
  "model": "Odyssey",
  "id_customer": "901nop7"
}, {
  "id_mobil": "WAUAF98E87A702950",
  "nopol": "EG 0203 EGH",
  "model": "City",
  "id_customer": "456z12a"
}, {
  "id_mobil": "ZFBCFADH4EZ815924",
  "nopol": "AV 3839 AVW",
  "model": "Civic",
  "id_customer": "567wxy0"
}, {
  "id_mobil": "1FMJU1H50AE469813",
  "nopol": "DM 8889 DMN",
  "model": "City",
  "id_customer": "012tuv9"
}, {
  "id_mobil": "JH4CU2F63CC257471",
  "nopol": "GG 3839 GGH",
  "model": "CR-V",
  "id_customer": "890hij5"
}, {
  "id_mobil": "WAUJC58E14A310227",
  "nopol": "HD 5455 HDE",
  "model": "Jazz",
  "id_customer": "234qrs8"
}, {
  "id_mobil": "1FTEX1C81AK055228",
  "nopol": "DA 7881 DAA",
  "model": "Jazz",
  "id_customer": "456bcd3"
}, {
  "id_mobil": "1C4RJEAG5FC818294",
  "nopol": "BD 4445 BDE",
  "model": "Accord",
  "id_customer": "234klm6"
}, {
  "id_mobil": "WAUJC68E04A734391",
  "nopol": "BM 5051 BMN",
  "model": "WR-V",
  "id_customer": "567tuv9"
}, {
  "id_mobil": "JN1BY0AR1AM398489",
  "nopol": "DM 8889 DMN",
  "model": "Civic",
  "id_customer": "012mnop"
}, {
  "id_mobil": "1G6AR5SX9F0385636",
  "nopol": "FJ 2223 FJK",
  "model": "BR-V",
  "id_customer": "012z12a"
}, {
  "id_mobil": "WBA3R5C51FK485346",
  "nopol": "M 1415 MNO",
  "model": "HR-V",
  "id_customer": "567efg4"
}, {
  "id_mobil": "1N4AL2AP4AN348624",
  "nopol": "FS 2829 FST",
  "model": "WR-V",
  "id_customer": "678hij5"
}, {
  "id_mobil": "1NXBU4EE6AZ262846",
  "nopol": "AJ 3031 AJK",
  "model": "Mobilio",
  "id_customer": "567hij5"
}, {
  "id_mobil": "5TDBM5G18BS165433",
  "nopol": "GP 4445 GPO",
  "model": "Accord",
  "id_customer": "345qrst"
}, {
  "id_mobil": "4JGDA2EB9DA325150",
  "nopol": "DA 7881 DAA",
  "model": "BR-V",
  "id_customer": "012z12a"
}, {
  "id_mobil": "JM1NC2MF9E0351813",
  "nopol": "DJ 8687 DJK",
  "model": "Odyssey",
  "id_customer": "567wxy0"
}, {
  "id_mobil": "5FRYD3H96GB895869",
  "nopol": "CM 6869 CMN",
  "model": "City",
  "id_customer": "789z12a"
}, {
  "id_mobil": "19UUA56882A338575",
  "nopol": "HA 5253 HAA",
  "model": "Odyssey",
  "id_customer": "345qrst"
}, {
  "id_mobil": "WDDLJ6FB1FA884593",
  "nopol": "AG 2829 AGH",
  "model": "Civic Type R",
  "id_customer": "def5678"
}, {
  "id_mobil": "JM3TB2BV5D0178303",
  "nopol": "BD 4445 BDE",
  "model": "Civic Type R",
  "id_customer": "901klm6"
}, {
  "id_mobil": "4JGDF2EE4FA496922",
  "nopol": "HG 5657 HGH",
  "model": "Mobilio",
  "id_customer": "789bcd3"
}, {
  "id_mobil": "1C3CCBCB9CN011930",
  "nopol": "D 5678 DEF",
  "model": "CR-V",
  "id_customer": "345wxy0"
}, {
  "id_mobil": "5BZBF0AA7FN474313",
  "nopol": "EM 0607 EMN",
  "model": "BR-V",
  "id_customer": "890wxy0"
}, {
  "id_mobil": "WAUPL58E64A613949",
  "nopol": "HM 6061 HMN",
  "model": "BR-V",
  "id_customer": "567efg4"
}, {
  "id_mobil": "1G6DS8EV4A0752318",
  "nopol": "DP 9091 DPO",
  "model": "Accord",
  "id_customer": "678z12a"
}, {
  "id_mobil": "WBAKF9C57BE574181",
  "nopol": "GJ 4041 GJK",
  "model": "Odyssey",
  "id_customer": "567klm6"
}, {
  "id_mobil": "WAUZL64B81N529615",
  "nopol": "AD 2627 ADE",
  "model": "Civic",
  "id_customer": "jkl3456"
}, {
  "id_mobil": "WAUKH98E18A340783",
  "nopol": "BA 4243 BAB",
  "model": "Civic Type R",
  "id_customer": "890nop7"
}, {
  "id_mobil": "WAUJT68E95A133174",
  "nopol": "AV 3839 AVW",
  "model": "Civic",
  "id_customer": "789bcd3"
}, {
  "id_mobil": "2C3CCAAG9FH530997",
  "nopol": "AA 2425 AAB",
  "model": "Civic Type R",
  "id_customer": "890nop7"
}, {
  "id_mobil": "1GYS3CEF5ER973774",
  "nopol": "AS 3637 AST",
  "model": "Civic Type R",
  "id_customer": "stu6789"
}, {
  "id_mobil": "5UXFG8C57CL344518",
  "nopol": "B 1234 ABC",
  "model": "Jazz",
  "id_customer": "234hij5"
}, {
  "id_mobil": "5J6TF1H5XFL640946",
  "nopol": "CJ 6667 CJK",
  "model": "HR-V",
  "id_customer": "890tuv9"
}, {
  "id_mobil": "5UXFG8C55EL279672",
  "nopol": "GV 4849 GVW",
  "model": "Accord",
  "id_customer": "789bcd3"
}, {
  "id_mobil": "WAUJC68E22A859230",
  "nopol": "AP 3435 APO",
  "model": "Odyssey",
  "id_customer": "789tuv9"
}, {
  "id_mobil": "JN1AZ4EH7DM640806",
  "nopol": "V 2021 VWX",
  "model": "City",
  "id_customer": "901bcd3"
}, {
  "id_mobil": "WAU3MAFD6FN154853",
  "nopol": "DS 9293 DST",
  "model": "CR-V",
  "id_customer": "456wxy0"
}, {
  "id_mobil": "3C3CFFBR8FT934241",
  "nopol": "CY 7677 CYZ",
  "model": "Civic Type R",
  "id_customer": "789z12a"
}, {
  "id_mobil": "JTDKDTB3XF1535796",
  "nopol": "EA 9899 EAA",
  "model": "HR-V",
  "id_customer": "901bcd3"
}, {
  "id_mobil": "3D7LT2ET0BG635940",
  "nopol": "CY 7677 CYZ",
  "model": "Accord",
  "id_customer": "123klm6"
}, {
  "id_mobil": "WAUVT68E02A361268",
  "nopol": "F 9101 GHI",
  "model": "City",
  "id_customer": "stu6789"
}, {
  "id_mobil": "WBACK73401L282118",
  "nopol": "AJ 3031 AJK",
  "model": "Jazz",
  "id_customer": "789z12a"
}, {
  "id_mobil": "5N1AR2MM1EC875804",
  "nopol": "FA 1617 FAA",
  "model": "Mobilio",
  "id_customer": "456qrs8"
}, {
  "id_mobil": "WAUKF78E47A763348",
  "nopol": "HM 6061 HMN",
  "model": "Odyssey",
  "id_customer": "123nop7"
}, {
  "id_mobil": "5NPEB4AC0BH302751",
  "nopol": "EV 1213 EVW",
  "model": "Brio",
  "id_customer": "234tuv9"
}, {
  "id_mobil": "3C63D2CL3CG108476",
  "nopol": "CS 7273 CST",
  "model": "Accord",
  "id_customer": "678klm6"
}, {
  "id_mobil": "2G4GW5EV9B9892882",
  "nopol": "GA 3435 GAA",
  "model": "Brio",
  "id_customer": "345wxy0"
}, {
  "id_mobil": "WAUVT68E15A405413",
  "nopol": "AS 3637 AST",
  "model": "WR-V",
  "id_customer": "123z12a"
}, {
  "id_mobil": "KMHDB8AEXAU120480",
  "nopol": "CV 7475 CVW",
  "model": "Jazz",
  "id_customer": "345qrst"
}, {
  "id_mobil": "1NXBU4EEXAZ999435",
  "nopol": "AA 2425 AAB",
  "model": "Civic Type R",
  "id_customer": "456tuv9"
}, {
  "id_mobil": "1G6DM56T450307461",
  "nopol": "GD 3637 GDE",
  "model": "Jazz",
  "id_customer": "567hij5"
}, {
  "id_mobil": "JTDZN3EU8D3437836",
  "nopol": "AS 3637 AST",
  "model": "CR-V",
  "id_customer": "901hij5"
}, {
  "id_mobil": "WBADN53443G904134",
  "nopol": "AA 2425 AAB",
  "model": "City",
  "id_customer": "012bcd3"
}, {
  "id_mobil": "WAUCFAFR2CA696055",
  "nopol": "FD 1819 FDE",
  "model": "HR-V",
  "id_customer": "123tuv9"
}, {
  "id_mobil": "WAUVT58E35A325699",
  "nopol": "V 2021 VWX",
  "model": "Odyssey",
  "id_customer": "901nop7"
}, {
  "id_mobil": "JTDKDTB30F1252243",
  "nopol": "FM 2425 FMN",
  "model": "WR-V",
  "id_customer": "123abcd"
}, {
  "id_mobil": "1YVHZ8BH2A5489655",
  "nopol": "AJ 3031 AJK",
  "model": "Civic Type R",
  "id_customer": "vwx0123"
}, {
  "id_mobil": "1FMNE1BW3AD082159",
  "nopol": "HM 6061 HMN",
  "model": "BR-V",
  "id_customer": "234klm6"
}, {
  "id_mobil": "1FTMF1E89AK356373",
  "nopol": "GJ 4041 GJK",
  "model": "Mobilio",
  "id_customer": "890wxy0"
}, {
  "id_mobil": "WBXPC93597W882023",
  "nopol": "HG 5657 HGH",
  "model": "Brio",
  "id_customer": "012tuv9"
}, {
  "id_mobil": "1N4AA5AP8BC992681",
  "nopol": "AV 3839 AVW",
  "model": "HR-V",
  "id_customer": "234efg4"
}, {
  "id_mobil": "WAUFEBFM9BA383237",
  "nopol": "J 1213 JKL",
  "model": "City",
  "id_customer": "345efg4"
}, {
  "id_mobil": "1GKS1KE02CR070078",
  "nopol": "HM 6061 HMN",
  "model": "Civic Type R",
  "id_customer": "123tuv9"
}, {
  "id_mobil": "1G6KS54Y41U297741",
  "nopol": "DV 9495 DVW",
  "model": "WR-V",
  "id_customer": "234qrs8"
}, {
  "id_mobil": "5N1AR2MM8DC574218",
  "nopol": "FY 3233 FYZ",
  "model": "Accord",
  "id_customer": "234nop7"
}, {
  "id_mobil": "WAUNF98P57A413978",
  "nopol": "GJ 4041 GJK",
  "model": "City",
  "id_customer": "ghi9012"
}, {
  "id_mobil": "4T1BD1FKXFU066838",
  "nopol": "AS 3637 AST",
  "model": "BR-V",
  "id_customer": "123abcd"
}, {
  "id_mobil": "1D7CW3BKXAS744485",
  "nopol": "HA 5253 HAA",
  "model": "BR-V",
  "id_customer": "678bcd3"
}, {
  "id_mobil": "WAULD54B54N643069",
  "nopol": "M 1415 MNO",
  "model": "WR-V",
  "id_customer": "567nop7"
}, {
  "id_mobil": "SCFAB223X3K455112",
  "nopol": "FG 2021 FGH",
  "model": "Civic Type R",
  "id_customer": "234nop7"
}, {
  "id_mobil": "1C4NJCBA8ED315221",
  "nopol": "BY 5859 BYZ",
  "model": "Civic",
  "id_customer": "pqr2345"
}, {
  "id_mobil": "WAUKD98P36A394824",
  "nopol": "HJ 5859 HJK",
  "model": "Brio",
  "id_customer": "234klm6"
}, {
  "id_mobil": "WAUEFBFL9CN073986",
  "nopol": "GJ 4041 GJK",
  "model": "Civic Type R",
  "id_customer": "789wxy0"
}, {
  "id_mobil": "1GYS3BEF6CR696690",
  "nopol": "HA 5253 HAA",
  "model": "Brio",
  "id_customer": "345bcd3"
}]

export default mobil