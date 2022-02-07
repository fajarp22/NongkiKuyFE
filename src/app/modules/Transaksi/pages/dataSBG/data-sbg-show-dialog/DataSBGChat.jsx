//  

import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import 'moment/locale/id';

export function DataSBGChat({ dataSBG, show, onHide }) {
  // Functions
  const normalisasiNomorHP = (phone = '') => {
    phone = String(phone).trim();
    phone = phone.replace(/[- .]/g, '');
    if (phone.startsWith('0')) {
      phone = '+62' + phone.slice(1);
    } else if (phone.startsWith('62')) {
      phone = '+62' + phone.slice(2);
    }
    return phone;
  };

  const JT = `Selamat+pagi%2C+%0D%0A%0D%0ANasabah+Yth.%0D%0AKami+beritahukan+bahwa+pinjaman+bapak%2Fibu+*${dataSBG?.mortgageCustomer?.nama_nasabah}*+sudah+jatuh+tempo+pada+*tanggal*+apabila+tidak+ada+konfirmasi+dari+bapak%2Fibu+maka+barang+jaminan+bapak%2Fibu+akan+dilakukan+penarikan.+%0D%0A%0D%0ATerima+kasih.%0D%0APT.+Rumah+Gadai+Jabar%0D%0A`;
  const JTM = `Selamat+sore%2C%0D%0A%0D%0ANasabah+Yth.+%0D%0AIbu%2FBapak+*${dataSBG?.mortgageCustomer?.nama_nasabah}*%2C+kami+dari+PT.+Rumah+Gadai+ingin+memberitahukan+bahwa+pinjaman+Ibu%2FBapak+*sudah+satu+minggu+memasuki+masa+tenggang+dan+satu+minggu+kedepan+barang+Ibu%2FBapak+akan+ditarik+pusat+untuk+dilakukan+penjualan+bersama*.+Jika+akan+melakukan+pembayaran+pelunasan%2Fperpanjangan%2Fpencicilan%2C+mohon+dilaksanakan+pada+hari+ini.%0D%0A%0D%0ADiingatkan+juga+jika+akan+melakukan+pembayaran+diwajibkan+untuk+membawa+Surat+Bukti+Gadai+yang+terkait.%0D%0A%0D%0ATerima+kasih%0D%0APT.+Rumah+Gadai+Jabar`;
  const MT = `Selamat+pagi%2C%0D%0A%0D%0AKepada+Nasabah+Yth.+%0D%0AIbu%2FBapak+*${dataSBG?.mortgageCustomer?.nama_nasabah}*+kami+dari+Rumah+Gadai+ingin+memberitahukan+bahwa+pinjaman+ibu%2Fbapak+%2Aakan+mengakhiri+masa+tenggang%2A%2C+jika+akan+melakukan+%2Apembayaran+pelunasan%2Fperpanjangan%2Fpencicilan%2A+dimohon+dilaksanakan+pada+%2Ahari+ini%2A+karena+per+besok+barang+akan+dilakukan+%2Apenarikan+ke+pusat%2A+untuk+dilakukan+penjualan+bersama.%0D%0A%0D%0ADiingatkan+juga+jika+akan+melakukan+pembayaran+diwajibkan+untuk+membawa+Surat+Bukti+Gadai+yang+terkait.%0D%0A%0D%0ATerima+kasih%0D%0APT.+Rumah+Gadai+Jabar`;
  const FUC = `Selamat+Siang%0D%0A%0D%0ANasabah+Yth.%0D%0AKami+beritahukan+kepada+Bapak%2FIbu+*${dataSBG?.mortgageCustomer?.nama_nasabah}*+bahwa+pinjaman+Bapak%2FIbu+sudah+masuk+hari+ke++%2827%2FH-3%29+dari+tanggal+jatuh+tempo+pada+*tanggal*.%0D%0AJika+belum+bisa+melakukan+pelunasan+bisa+melakukan+transaksi+perpanjangan%2Fpelunasan+sebagian+%F0%9F%98%8A%0D%0A%0D%0ANote%3A+Jam+operasional%0D%0A%0D%0ATerima+kasih%0D%0APT.+Rumah+Gadai+Jabar`;

  return (
    <>
      <Modal centered size="md" show={show} onHide={onHide}>
        <Modal.Header closeButton={true}>
          <Modal.Title>Follow Up Nasabah {dataSBG?.mortgageCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table borderless={true} size="sm">
            <tbody>
              <tr>
                <td align="center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${normalisasiNomorHP(
                      dataSBG?.mortgageCustomer?.nomor_hp
                    )}?text=${FUC}`}>
                    <Button variant="success" className="ml-1 mr-3">
                      Follow Up Nasabah oleh Cabang
                    </Button>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${normalisasiNomorHP(
                      dataSBG?.mortgageCustomer?.nomor_hp
                    )}?text=${JT}`}>
                    <Button variant="success" className="ml-1 mr-3">
                      Jatuh Tempo
                    </Button>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${normalisasiNomorHP(
                      dataSBG?.mortgageCustomer?.nomor_hp
                    )}?text=${JTM}`}>
                    <Button variant="success" className="ml-1 mr-3">
                      Jatuh Tempo + 1 Minggu
                    </Button>
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/${normalisasiNomorHP(
                      dataSBG?.mortgageCustomer?.nomor_hp
                    )}?text=${MT}`}>
                    <Button variant="success" className="ml-1 mr-3">
                      Masa Tenggang
                    </Button>
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
